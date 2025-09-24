function getCommentThreadLength(comment, visited = new Map()) {
  if (visited.has(comment)) return 0;

  visited.set(comment, true);
  // Base case if comment has no replies
  if (!comment.replies || comment.replies.length === 0) return 1;

  // main comment
  let total = 1;

  // Recursive case
  for (let reply of comment.replies) {
    total += getCommentThreadLength(reply, visited);
  }
  return total;
}

const comment = {
  text: "comment 1",
  replies: [],
};

const child = {
  test: "comment 2",
  replies: [],
};

comment.replies.push(child);
child.replies.push(comment);

console.log(getCommentThreadLength(comment));
