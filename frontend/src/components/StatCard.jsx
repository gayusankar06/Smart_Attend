export default function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
