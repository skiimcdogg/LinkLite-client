function About() {
  return (
    <div className="mx-3 pb-5">
      <h1 className="underline decoration-double mb-10">About LinkLite</h1>
      <p className="text-sm mb-10">
        Hi, I’m Antoine, and I built LinkLite to practice and have fun while
        honing my backend development skills. I've always been interested in
        learning how to secure and optimize web applications, and what better
        way to experiment than with a URL shortener?
      </p>
      <h3 className="mb-5">My main goals were to:</h3>
      <ul className="list-disc list-inside text-sm mb-10">
        <li>Create solid, clean and secure backend using Django/Python.</li>
        <li>Implement email verification to ensure user security.</li>
        <li>Use tokens to handle secure authentication and request.</li>
      </ul>
      <h3 className="mb-5">Technologies used:</h3>
      <ul className="list-disc list-inside text-sm mb-10">
        <li>
          <span className="underline decoration-double">Backend</span>: Django,
          DRF (Python) and Postgresql
        </li>
        <li>
          <span className="underline decoration-double">Security</span>:
          Token-based authentication and email verification
        </li>
        <li>
        <span className="underline decoration-double">Frontend</span>: React
          Tailwindcss
        </li>
      </ul>
      <p className="text-sm mb-5">
        You can also find me on LinkedIn, where I’ve shared more details about
        this project, including a test account you can use to explore the app:
      </p>
      <ul className="list-disc list-inside text-sm mb-10">
        <li>
          <a
            href="https://www.linkedin.com/in/antoine-stouff/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neonBlue"
          >
            My LinkedIn post for more details
          </a>
        </li>
      </ul>
      <p className="text-sm mb-5">
        Feel free to reach me out:
      </p>
      <ul className="list-disc list-inside text-sm mb-10">
        <li>
          <a
            href="https://www.antoinestouff.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neonBlue"
          >
            My portfolio
          </a>
        </li>
        <li><span className="underline decoration-double">Email</span>: antoine.stouff78500@gmail.com</li>
      </ul>
    </div>
  );
}

export default About;
