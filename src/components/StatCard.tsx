export type StatCardProps = {
    title: string;
    value: string | number;
};

const StatCard = ({ title, value }: StatCardProps) => {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <h2 className="text-sm font-medium text-slate-500">
                {title}
            </h2>

            <p className="mt-3 text-3xl font-bold tracking-tight text-slate-800">
                {value}
            </p>
        </div>
    );
};

export default StatCard;