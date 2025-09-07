export default function AboutUs() {
  return (
    <div className="max-w-5xl px-4 py-12 mx-auto my-10 bg-[#F0E9CC] text-[#222] rounded-lg shadow-md">
      <h1 className="mb-6 text-4xl font-bold text-center text-[#00A7A7]">About Us</h1>

      <p className="max-w-3xl mx-auto mb-6 text-lg text-center text-[#00A7A7]">
        Welcome to <span className="font-semibold text-[#00A7A7]">BLOG APP</span>{" "}
        — a place where technology, creativity, and knowledge come together.
        Whether you’re passionate about web development, exploring with React,
        or curious about ethical hacking, you’ll find content crafted for
        curious minds like yours.
      </p>

      <div className="grid grid-cols-1 gap-8 mt-10 md:grid-cols-2">
        <div className="p-6 rounded-lg shadow bg-white/70">
          <h2 className="mb-3 text-2xl font-semibold text-[#00A7A7]">Our Vision</h2>
          <p className="text-base text-[#222]">
            We aim to empower learners, developers, and thinkers through quality
            content and practical insights. Our blog is more than articles—it's
            a journey into the evolving world of tech.
          </p>
        </div>

        <div className="p-6 rounded-lg shadow bg-white/70">
          <h2 className="mb-3 text-2xl font-semibold text-[#00A7A7]">What We Cover</h2>
          <ul className="space-y-1 text-base text-[#222] list-disc list-inside">
            <li>React & modern frontend development</li>
            <li>Web security & ethical hacking basics</li>
            <li>Tech tutorials, tips, and walkthroughs</li>
            <li>Industry trends and developer tools</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm italic text-[#00A7A7]">
          "React helps us build the web. Hacking helps us protect it. We’re here
          to master both."
        </p>
      </div>
    </div>
  );
}