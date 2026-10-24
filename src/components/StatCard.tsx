export type StatCardProps = {
    title: string;
    value: string | number;
};

const StatCard = ({ title, value }: StatCardProps) => {
    return (
        <div className="stat-card">
            <h2 className="stat-label">
                {title}
            </h2>

            <p className={typeof value === "string" ? "stat-value stat-value--text" : "stat-value"}>
                {value}
            </p>
        </div>
    );
};

export default StatCard;
