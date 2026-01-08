"use client";

import { useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";

interface CommentDoc {
  id: string;
  name?: string;
  message: string;
  createdAt?: Timestamp;
  userId?: string;
  photoURL?: string | null;
}

interface CommentsProps {
  slug: string;
}

export default function Comments({ slug }: CommentsProps) {
  const [comments, setComments] = useState<CommentDoc[]>([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const commentsRef = useMemo(
    () => collection(db, "posts", slug, "comments"),
    [slug]
  );

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (current) => {
      setUser(current);
    });

    const q = query(commentsRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: CommentDoc[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<CommentDoc, "id">),
      }));
      setComments(data);
    });

    return () => {
      unsubscribe();
      unsubscribeAuth();
    };
  }, [commentsRef]);

  async function handleSignIn() {
    setError(null);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
      console.error(err);
    }
  }

  async function handleSignOut() {
    setError(null);
    try {
      await signOut(auth);
    } catch (err) {
      setError("Sign-out failed. Please retry.");
      console.error(err);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!user) {
      setError("Sign in with Google to comment.");
      return;
    }

    if (!message.trim()) {
      setError("Please enter a comment.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(commentsRef, {
        name: user.displayName || "Anonymous",
        userId: user.uid,
        photoURL: user.photoURL || null,
        message: message.trim(),
        createdAt: serverTimestamp(),
      });
      setMessage("");
    } catch (err) {
      setError("Failed to post comment. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-12 space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-display font-semibold text-white">
          Comments
        </h2>
        <p className="text-sm text-zinc-500">
          Sign in with Google to comment.
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <div className="flex items-center gap-3">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "User avatar"}
              className="h-10 w-10 rounded-full border border-zinc-800 object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-zinc-700 text-xs text-zinc-500">
              {user ? "You" : "Anon"}
            </div>
          )}
          <div className="text-sm text-zinc-300">
            {user ? (
              <>
                <p className="font-medium text-white">{user.displayName || "Signed in"}</p>
                <p className="text-zinc-500">{user.email}</p>
              </>
            ) : (
              <p className="text-zinc-500">Not signed in</p>
            )}
          </div>
        </div>
        {user ? (
          <button
            onClick={handleSignOut}
            className="cursor-pointer rounded-lg border border-zinc-700 px-3 py-1.5 text-sm font-medium text-white transition hover:border-zinc-500 hover:bg-white/5"
          >
            Sign out
          </button>
        ) : (
          <button
            onClick={handleSignIn}
            className="cursor-pointer rounded-lg bg-white text-zinc-900 px-3 py-1.5 text-sm font-semibold shadow-sm transition hover:bg-zinc-100"
          >
            Sign in with Google
          </button>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 backdrop-blur-sm"
      >
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a comment"
          rows={3}
          disabled={!user}
          className="w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting || !user}
          className="cursor-pointer inline-flex items-center justify-center rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {user ? (isSubmitting ? "Posting..." : "Post comment") : "Sign in to comment"}
        </button>
      </form>

      <div className="space-y-3">
        {comments.length === 0 && (
          <p className="text-sm text-zinc-500">No comments yet. Be the first!</p>
        )}

        {comments.map((comment) => {
          const created = comment.createdAt?.toDate?.();
          const dateLabel = created
            ? created.toLocaleString()
            : "Just now";

          return (
            <div
              key={comment.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4"
            >
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  {comment.photoURL ? (
                    <img
                      src={comment.photoURL}
                      alt={comment.name || "User"}
                      className="h-7 w-7 rounded-full border border-zinc-800 object-cover"
                    />
                  ) : null}
                  <span className="font-medium text-zinc-200">
                    {comment.name || "Anonymous"}
                  </span>
                </div>
                <span>{dateLabel}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-100 leading-relaxed">
                {comment.message}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
