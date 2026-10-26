
const LETTERS = "OfficeHub".split("");

const LogoAnimation = () => {
    return (
        <section className="logo-anim" aria-label="OfficeHub">
            <svg
                className="logo-anim-mark"
                viewBox="0 0 64 64"
                role="img"
                aria-hidden="true"
            >
                <rect className="logo-tile" width="64" height="64" rx="14" />
                <rect className="logo-bld logo-bld-a" x="15" y="13" width="14" height="38" rx="2" />
                <rect className="logo-bld logo-bld-b" x="35" y="25" width="14" height="26" rx="2" />
                <rect className="logo-bridge" x="27" y="33" width="10" height="6" />
                <g className="logo-windows">
                    <rect x="19" y="18" width="6" height="5" rx="1" />
                    <rect x="19" y="26" width="6" height="5" rx="1" />
                    <rect x="19" y="41" width="6" height="5" rx="1" />
                    <rect x="39" y="30" width="6" height="5" rx="1" />
                    <rect x="39" y="41" width="6" height="5" rx="1" />
                </g>
            </svg>

            <div className="logo-anim-text" dir="ltr" aria-hidden="true">
                <span className="logo-word">
                    {LETTERS.map((ch, i) => (
                        <span
                            key={i}
                            className="logo-letter"
                            style={{ animationDelay: `${0.7 + i * 0.07}s` }}
                        >
                            {ch}
                        </span>
                    ))}
                </span>
                <span className="logo-line" />
                <span className="logo-tagline">ניהול משרדים וחדרי ישיבות</span>
            </div>
        </section>
    );
};

export default LogoAnimation;
