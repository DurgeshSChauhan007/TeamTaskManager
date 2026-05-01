export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        Project Management
      </h1>

      <div className="flex items-center gap-4">
        <h2 className="font-semibold">
          Hi, {user?.name}
        </h2>

        <img
          src={`https://ui-avatars.com/api/?name=${user?.name}`}
          alt=""
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
}