import { Component } from "react";
import messages from "@/i18n/messages.js";

// The last line of defence: a render error shows a friendly note, never a blank page.
export class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main className="min-h-screen bg-paper px-4 py-24 font-body text-ink">
        <div className="mx-auto max-w-lg rounded-3xl border-2 border-ink bg-white p-8 shadow-block">
          <h1 className="font-display text-3xl font-extrabold">{messages.errors.title}</h1>
          <p className="mt-3 text-lg">{messages.errors.text}</p>
        </div>
      </main>
    );
  }
}
