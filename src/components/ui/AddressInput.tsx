"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Loader2, MapPin } from "lucide-react";
import Input from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export interface PlaceSelection {
  placeId: string;
  description: string;
}

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onPlaceSelect?: (selection: PlaceSelection) => void;
  name?: string;
  placeholder?: string;
  invalid?: boolean;
}

interface Suggestion {
  placeId: string;
  primary: string;
  secondary: string;
  description: string;
}

const DEBOUNCE_MS = 300;
const MIN_CHARS = 3;

function newSessionToken(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

export default function AddressInput({
  value,
  onChange,
  onBlur,
  onPlaceSelect,
  name,
  placeholder,
  invalid,
}: AddressInputProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [sessionToken] = useState(newSessionToken);
  const listboxId = useId();

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    };
  }, []);

  const fetchSuggestions = useCallback(
    async (query: string) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);

      try {
        const response = await fetch("/api/places/autocomplete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: query, sessionToken }),
          signal: controller.signal,
        });

        if (response.status === 503) {
          // Autocomplete not configured - behave like a plain text input.
          setSuggestions([]);
          setOpen(false);
          return;
        }

        const data = (await response.json().catch(() => ({}))) as {
          suggestions?: Suggestion[];
        };
        const list = Array.isArray(data.suggestions) ? data.suggestions : [];
        setSuggestions(list);
        setOpen(list.length > 0);
        setActiveIndex(-1);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setSuggestions([]);
          setOpen(false);
        }
      } finally {
        setLoading(false);
      }
    },
    [sessionToken]
  );

  const handleInputChange = (next: string) => {
    onChange(next);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const query = next.trim();
    if (query.length < MIN_CHARS) {
      setSuggestions([]);
      setOpen(false);
      setLoading(false);
      return;
    }
    debounceRef.current = setTimeout(() => void fetchSuggestions(query), DEBOUNCE_MS);
  };

  const selectSuggestion = (suggestion: Suggestion) => {
    const description = suggestion.description || suggestion.primary;
    onChange(description);
    onPlaceSelect?.({ placeId: suggestion.placeId, description });
    setOpen(false);
    setSuggestions([]);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (index) => (index - 1 + suggestions.length) % suggestions.length
      );
    } else if (event.key === "Enter") {
      if (activeIndex >= 0) {
        event.preventDefault();
        selectSuggestion(suggestions[activeIndex]);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="relative">
      <Input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        icon={<MapPin className="w-4 h-4" />}
        autoComplete="off"
        spellCheck={false}
        className={invalid ? "border-red-300" : undefined}
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={
          activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
        }
        onChange={(event) => handleInputChange(event.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (suggestions.length > 0) setOpen(true);
        }}
        onBlur={() => {
          setOpen(false);
          setActiveIndex(-1);
          onBlur?.();
        }}
      />

      {loading && (
        <span className="pointer-events-none absolute right-3 top-3 text-gray-400">
          <Loader2 className="w-4 h-4 animate-spin" />
        </span>
      )}

      {open && suggestions.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-30 mt-1 w-full max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.placeId}
              id={`${listboxId}-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(event) => {
                event.preventDefault();
                selectSuggestion(suggestion);
              }}
              onMouseEnter={() => setActiveIndex(index)}
              className={cn(
                "cursor-pointer px-3 py-2",
                index === activeIndex ? "bg-emerald-50" : "bg-white"
              )}
            >
              <span className="block text-xs sm:text-sm text-gray-900">
                {suggestion.primary}
              </span>
              {suggestion.secondary && (
                <span className="block text-[11px] text-gray-500">
                  {suggestion.secondary}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
