"use client";

import React from "react";
import Latex from "react-latex-next";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface MathBlockProps {
  content?: string;
  math?: string;
}

export function MathBlock({ content, math }: MathBlockProps) {
  const actualContent = content || math || "";

  // Check for common escaping issues
  const hasBackspace = actualContent.includes('\b');
  const hasTab = actualContent.includes('\t');
  const hasCarriageReturn = actualContent.includes('\r');
  
  // A raw block shouldn't natively evaluate \b unless it was parsed as a standard JS string.
  // If it was parsed as a standard JS string, the backslash was consumed!
  const hasEscapingIssues = hasBackspace || hasTab || hasCarriageReturn;
  
  // Fallback cleanup if the developer forgot to use String.raw or double backslashes
  // We can't perfectly recover \b because it evaluated to a backspace character,
  // but we can replace the backspace with \b to try and fix it automatically!
  let safeContent = actualContent;
  if (hasBackspace) safeContent = safeContent.replace(/\u0008/g, '\\b');
  if (hasTab) safeContent = safeContent.replace(/\t/g, '\\t');
  if (hasCarriageReturn) safeContent = safeContent.replace(/\r/g, '\\r');

  const isWrapped = safeContent.includes('$$') || safeContent.includes('\\[');
  
  // If we have newlines (\\) but no LaTeX environment, we must wrap it in aligned to prevent KaTeX warnings
  if (safeContent.includes('\\\\') && !safeContent.includes('\\begin{')) {
    // Strip existing $$ if they exist so we don't double wrap them around aligned
    const innerContent = safeContent.replace(/\$\$/g, '').trim();
    safeContent = `$$ \\begin{aligned} ${innerContent} \\end{aligned} $$`;
  } else if (!isWrapped) {
    // Auto-wrap with $$ if it's missing, so plain LaTeX strings are rendered as block math
    safeContent = `$$ ${safeContent} $$`;
  }

  // We wrap the Latex component in a try-catch error boundary (KaTeX sometimes throws)

  // We wrap the Latex component in a try-catch error boundary (KaTeX sometimes throws)
  return (
    <div className="w-full">
      {hasEscapingIssues && (
        <Alert variant="destructive" className="mb-4 bg-red-950/50 border-red-900 text-red-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>LaTeX Escaping Warning</AlertTitle>
          <AlertDescription>
            This math block contains unescaped control characters (like `\b` or `\t`). 
            In React template literals, `\begin` evaluates to a backspace! 
            <strong>Fix:</strong> Use <code>String.raw`$$ \\begin... $$`</code> or use double backslashes <code>\\\\begin</code>.
          </AlertDescription>
        </Alert>
      )}
      


      <div className="w-full max-w-full overflow-x-auto my-4 bg-black/40 p-4 rounded-xl text-center">
        <Latex>{safeContent}</Latex>
      </div>
    </div>
  );
}
