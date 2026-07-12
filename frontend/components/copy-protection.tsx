"use client";

import { useEffect } from "react";

const editableSelector = "input, textarea, select, [contenteditable='true']";

const isEditableTarget = (target: EventTarget | null) => {
  return target instanceof HTMLElement && Boolean(target.closest(editableSelector));
};

const CopyProtection = () => {
  useEffect(() => {
    document.body.classList.add("copy-protection-active");

    const preventDefault = (event: Event) => {
      event.preventDefault();
    };

    const preventOutsideEditable = (event: Event) => {
      if (!isEditableTarget(event.target)) {
        event.preventDefault();
      }
    };

    const preventCopyKeys = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && ["a", "c", "x"].includes(key)) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventDefault);
    document.addEventListener("copy", preventOutsideEditable);
    document.addEventListener("cut", preventOutsideEditable);
    document.addEventListener("selectstart", preventOutsideEditable);
    document.addEventListener("dragstart", preventDefault);
    document.addEventListener("keydown", preventCopyKeys);

    return () => {
      document.body.classList.remove("copy-protection-active");
      document.removeEventListener("contextmenu", preventDefault);
      document.removeEventListener("copy", preventOutsideEditable);
      document.removeEventListener("cut", preventOutsideEditable);
      document.removeEventListener("selectstart", preventOutsideEditable);
      document.removeEventListener("dragstart", preventDefault);
      document.removeEventListener("keydown", preventCopyKeys);
    };
  }, []);

  return null;
};

export default CopyProtection;
