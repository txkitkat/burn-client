import "./About.css";

export default function About() {
    return (
        <div className="about">
            <h1>About the Project</h1>

            {/* 🔽 IMAGE INSERTED HERE */}
            <img
                src="/photo-7752760_1280.jpg"
                alt="Prescribed Burn"
                className="about-img"
            />
            <div className="caption"></div>

            <p>The risk of wildfires has been increasing in the state of California over the past few years,
                prescribed(Rx) fires or controlled burns are a known method of mitigating the risk, however they
                have not been widely adopted. The <a href="https://sites.uci.edu/sparxcal/">The SPARx Cal </a> project led by the University of California, Irvine has as its
                goal the dissemination of research to support an increase in the pace and scale of prescribed (Rx) fires in
                California. SPARx Cal project consists of a multidisciplinary team with expertise in fire and smoke
                modeling and information technology (IT)-enabled decision support. They intend to develop new models
                and technologies and apply them in the field during planned Rx burns and share the knowledge gained
                to usher in a new era of fire use in California (CA).</p>

            <p>As part of this larger effort some of the researchers are attempting to determine from historical burn
                data, patterns that can help predict ideal meteorological burn windows. Burn windows are ideal time
                periods (considering factors such as weather, vegetation, season, previous burn etc) during which
                prescribed fires can be conducted. The researchers need to sift through data from multiple datasets and
                other real time data sources in order to identify these burn windows. The research team will therefore
                benefit from having a visual dashboard with which they can interact. The aim of this FireMaps web based dashboard is to help the researchers
                visualize the data at hand.</p>
                
            <div className="highlights">
                <h2>What Sets Us Apart?</h2>
                <ul>
                    <li>
                        <strong>Specialized for Prescribed Fires:</strong> Our prediction dashboard is uniquely designed for prescribed fire planning.
                    </li>
                    <li>
                        <strong>Automation & Convenience:</strong> Enter a date and location, our system auto fetches climate data for simulation.
                    </li>
                    <li>
                        <strong>All-In-One View:</strong> The SPARx Fire Map lets users explore climate features, burn windows, and escaped fire risks in one interface.
                    </li>
                </ul>
            </div>

            <div className="vision-section">
                <h2>Our Vision</h2>
                <p>To make prescribed burns safer, smarter and more reliable.</p>
                <img
                    src="/fire-9355214_1280.jpg"
                    alt="Controlled prescribed burn"
                    className="vision-img"
                />
            </div>

        </div>
    );
}
