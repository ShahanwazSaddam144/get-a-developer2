"use client";

import React, { useEffect, useState } from "react";

const CommentsSection = ({ profileId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchComments();
  }, [profileId]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${profileId}`);
      const data = await res.json();

      if (data.success) {
        setComments(data.comments || []);
      }
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to comment");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`http://localhost:5000/api/comments/${profileId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment: newComment,
          rating: parseInt(rating),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Comment posted successfully!");
        setNewComment("");
        setRating(5);
        fetchComments();
      } else {
        setError(data.message || "Failed to post comment");
      }
    } catch (err) {
      setError("Error posting comment");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? "text-yellow-400 text-lg" : "text-gray-600 text-lg"}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-[#1e1e1e] to-[#161616] rounded-2xl p-8 mb-8 border border-gray-800 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-gray-700">
        Reviews & Comments
      </h2>

      {/* Comment Form */}
      <div className="bg-[#121212] p-6 rounded-lg border border-gray-700 mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Leave a Review</h3>

        {error && (
          <div className="mb-4 p-3 bg-red-600/20 text-red-400 rounded-lg border border-red-600/50">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-600/20 text-green-400 rounded-lg border border-green-600/50">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div>
            <label className="text-gray-300 font-semibold mb-2 block">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-3xl transition ${
                    star <= rating ? "text-yellow-400" : "text-gray-600"
                  } hover:text-yellow-400`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-gray-300 font-semibold mb-2 block">Your Comment</label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your experience working with this developer..."
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition"
          >
            {submitting ? "Posting..." : "Post Review"}
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">All Reviews ({comments.length})</h3>

        {loading ? (
          <p className="text-gray-400 text-center py-8">Loading reviews...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No reviews yet. Be the first to review!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="bg-[#121212] p-6 rounded-lg border border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold border border-gray-600">
                    {comment.user?.name
                      ? comment.user.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase()
                      : "A"}
                  </div>
                  <h4 className="text-white font-semibold">
                    {comment.user?.name || "Anonymous"}
                  </h4>
                </div>
                {renderStars(comment.rating)}
              </div>

              <p className="text-gray-300 mb-2">{comment.comment}</p>

              <p className="text-gray-600 text-xs">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;