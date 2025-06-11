import React, { useEffect } from "react";
import { Code2, Cloud, TrendingUp, Award, BookOpen, CheckCircle2 } from "lucide-react";
import CountUp from "react-countup";
import "../../styles/About.css";

const stats = [
  {
    value: 4,
    label: "Projects Completed",
    icon: <Award className="w-7 h-7" />,
    suffix: "+",
    tooltip: "Built across web, cloud, and automation domains!",
  },
  {
    value: 3,
    label: "Years Learning",
    icon: <BookOpen className="w-7 h-7" />,
    suffix: "+",
    tooltip: "Continuous learning is my core strength!",
  }
];

const features = [
  "Open to collaboration on tech projects",
  "Strong focus on clean, maintainable code",
  "Eager to learn and adapt new technologies",
  "Enjoy mentoring & knowledge sharing",
  "Driven by real-world problem solving"
];

// Intersection Observer for scroll-based card animation
function useScrollAnimation(className = "scroll-animate") {
  useEffect(() => {
    const elements = document.querySelectorAll(`.${className}`);
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated-in");
          }
        });
      },
      { threshold: 0.18 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [className]);
}

const About: React.FC = () => {
  useScrollAnimation("scroll-animate");
  return (
    <section className="about-section-dark min-h-screen w-full relative overflow-x-hidden">
      <div className="about-container-dark mx-auto max-w-4xl px-3 pt-20 pb-10 relative z-10">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="about-title-dark text-4xl md:text-5xl font-extrabold mb-4">
            My Journey in Tech
          </h1>
          <div className="about-title-underline-dark mx-auto my-3"></div>
          <div className="about-tags-dark flex flex-wrap justify-center gap-3 mb-7">
            <span className="about-role-dark">
              <Code2 className="w-5 h-5 mr-1" />
              Software Developer
            </span>
            <span className="about-role-dark">
              <Cloud className="w-5 h-5 mr-1" />
              Cloud Enthusiast
            </span>
            <span className="about-role-dark">
              <TrendingUp className="w-5 h-5 mr-1" />
              Data Science Learner
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="about-grid-dark">
          <div className="about-card-dark about-intro-dark scroll-animate">
            <p>
              Hi! I'm a <span className="about-highlight-dark">computer science</span> student passionate about technology and innovation.
              <br /><br />
              I love building <span className="about-highlight-dark">modern web apps</span>, exploring <span className="about-highlight-dark">cloud & DevOps</span>, and now diving into <span className="about-highlight-dark">data science</span>. My journey is all about <span className="about-highlight-dark">learning</span>, experimenting, and turning ideas into impactful projects.
              <br /><br />
              I'm always eager to take on new challenges, collaborate with others, and grow as a <span className="about-highlight-dark">developer</span> and problem solver.
            </p>
          </div>
          <div className="about-card-dark scroll-animate">
            <h3 className="about-card-title-dark">Career Goal</h3>
            <div className="about-card-underline-dark"></div>
            <div className="about-card-content-dark">
              My goal is to become a <span className="about-highlight-dark">skilled software developer</span> and cloud engineer, creating <span className="about-highlight-dark">real-world solutions</span> that make a positive impact.
            </div>
          </div>
          <div className="about-card-dark scroll-animate">
            <h3 className="about-card-title-dark">Technical Focus</h3>
            <div className="about-card-underline-dark"></div>
            <div className="about-card-content-dark">
              I focus on <span className="about-highlight-dark">computer science fundamentals</span>, software development, and cloud & DevOps.<br />
              Recently, I started learning <span className="about-highlight-dark">data science</span> to expand my skills even further.
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="about-stats-row-dark flex flex-wrap justify-center gap-7 mt-12">
          {stats.map((stat) => (
            <div key={stat.label} className="about-stat-card-dark scroll-animate" tabIndex={0}>
              <span className="about-stat-icon-dark">{stat.icon}</span>
              <span className="about-stat-value-dark">
                <CountUp end={stat.value} duration={1.5} enableScrollSpy={true} scrollSpyOnce={true} />{stat.suffix}
              </span>
              <span className="about-stat-label-dark">{stat.label}</span>
              <span className="about-stat-tooltip">{stat.tooltip}</span>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="about-features-dark mt-16 mx-auto max-w-2xl scroll-animate">
          <h3 className="about-features-title-dark">What drives me?</h3>
          <div className="about-card-underline-dark mb-4"></div>
          <ul className="about-features-list-dark">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-sky-400" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;