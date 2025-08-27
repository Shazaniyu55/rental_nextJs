import { motion } from "framer-motion";

export default function ScrollTriggered() {
    return (
        <div className="niyu" >
            

            {steps.map(([label, hueA, hueB], i) => (
                <Card i={i} label={label} hueA={hueA} hueB={hueB} key={label} />
            ))}
        </div>
    );
}

function Card({ label, hueA, hueB, i }) {
    const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

    return (
        <motion.div
            className={`card-container-${i}`}
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8 }}
        >
            <div style={{ ...splash, background }} />
            <motion.div style={card} variants={cardVariants} className="card">
                {label}
            </motion.div>
        </motion.div>
    );
}

const cardVariants = {
    offscreen: {
        y: 300,
        opacity: 0
    },
    onscreen: {
        y: 50,
        rotate: -5,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};

const hue = (h) => `hsl(${h}, 100%, 50%)`;

/**
 * ==============   Styles   ================
 */
const container = {
    margin: "100px auto",
    maxWidth: 500,
    paddingBottom: 100,
    width: "100%"
};

const cardContainer = {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: 20,
    marginBottom: -120
};

const splash = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`
};

const card = {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    padding: "20px",
    width: 250,
    height: 430,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    background: "#f5f5f5ff",
    boxShadow:
        "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
    transformOrigin: "10% 60%"
};

/**
 * ==============   Data (Cleaning Steps)   ================
 */
const steps = [
    ["📅 Book Your Cleaning", 200, 220],
    ["📞 Confirm Appointment", 30, 50],
    ["🧹 Our Team Arrives", 90, 110],
    ["✨ Deep Cleaning", 150, 170],
    ["✅ Final Inspection", 250, 270],
    ["🏡 Enjoy Your Fresh Space", 300, 320]
];
