'use client';

import { useEffect, useRef, useState } from 'react';

export function AdminForm({
  action,
  children,
  className
}: {
  action: (formData: FormData) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [dirty, setDirty] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!dirty) {
        return;
      }
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  return (
    <form
      ref={formRef}
      className={className}
      onChange={() => setDirty(true)}
      action={async (formData) => {
        setPending(true);
        setMessage('Saving...');

        try {
          await action(formData);
          setDirty(false);
          setMessage('Saved');
        } catch {
          setMessage('Save failed');
        } finally {
          setPending(false);
        }
      }}
    >
      {children}
      <div className="admin-form-footer">
        <button className="btn btn-primary" type="submit" disabled={pending}>
          {pending ? 'Saving...' : 'Save changes'}
        </button>
        <span className="admin-muted" aria-live="polite">
          {message}
        </span>
      </div>
    </form>
  );
}
