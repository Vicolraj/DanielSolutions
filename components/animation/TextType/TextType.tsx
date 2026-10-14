'use client';

import { useEffect, useMemo, useRef, useState, type ElementType } from 'react';

type TextTypeProps = {
  className?: string;
  showCursor?: boolean;
  cursorCharacter?: string | React.ReactNode;
  cursorBlinkDuration?: number;
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
};

export default function TextType({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  cursorCharacter = '|',
  cursorBlinkDuration = 0.5
}: TextTypeProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentText = textArray[currentTextIndex] ?? '';

    if (isDeleting) {
      if (displayedText === '') {
        setIsDeleting(false);
        if (currentTextIndex === textArray.length - 1 && !loop) {
          return;
        }
        setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
        setCurrentCharIndex(0);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
      }
    } else if (currentCharIndex < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText[currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      }, currentCharIndex === 0 ? initialDelay : typingSpeed);
    } else if (loop) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    }

    return () => clearTimeout(timeout);
  }, [currentCharIndex, deletingSpeed, displayedText, initialDelay, isDeleting, loop, pauseDuration, textArray, currentTextIndex, typingSpeed]);

  useEffect(() => {
    if (!cursorRef.current || !showCursor) {
      return;
    }

    const cursor = cursorRef.current;
    const interval = setInterval(() => {
      cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, cursorBlinkDuration * 1000);

    return () => clearInterval(interval);
  }, [showCursor, cursorBlinkDuration]);

  return (
    <Component className={`text-type ${className}`}>
      <span className="text-type__content">{displayedText}</span>
      {showCursor ? (
        <span ref={cursorRef} className="text-type__cursor">
          {cursorCharacter}
        </span>
      ) : null}
    </Component>
  );
}
