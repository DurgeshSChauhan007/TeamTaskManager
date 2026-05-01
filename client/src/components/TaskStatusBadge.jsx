export default function TaskStatusBadge({
  status,
}) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-white text-sm ${
        status === "Done"
          ? "bg-green-500"
          : status === "In Progress"
          ? "bg-yellow-500"
          : "bg-gray-500"
      }`}
    >
      {status}
    </span>
  );
}