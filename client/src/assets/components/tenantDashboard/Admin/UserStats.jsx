const UserStats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card title="Total Users" value="120" />
            <Card title="Owners" value="15" />
            <Card title="Tenants" value="95" />
            <Card title="Admins" value="10" />
        </div>
    );
};

const Card = ({ title, value }) => (
    <div className="bg-white rounded-xl shadow p-5">
        <p className="text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
);