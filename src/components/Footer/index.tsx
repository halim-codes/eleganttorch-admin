import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="wow fadeInUp relative z-10 bg-[#090E34] pt-16 pb-10 px-4 lg:pt-[80px] lg:pb-[60px] lg:px-8"
      data-wow-delay=".15s"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-3/12 mb-10">
            <Link href="/" className="mb-6 inline-block max-w-[160px]">
              <Image
                src="/images/logo/dark-theme-logo.png"
                alt="logo"
                width={140}
                height={30}
                className="max-w-full"
              />
            </Link>
            <p className="mb-6 max-w-[270px] text-base text-gray-7">
              We create digital experiences for brands and companies by using
              technology.
            </p>
            <div className="-mx-2 flex items-center">
              {[...Array(4)].map((_, i) => (
                <Link
                  key={i}
                  aria-label="social link"
                  href="#"
                  className="px-2 text-gray-7 hover:text-white"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <circle cx="11" cy="11" r="10" fill="currentColor" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {[
            { title: "About Us", links: ["Home", "Features", "About", "Testimonial"] },
            { title: "Features", links: ["How it works", "Privacy policy", "Terms of Service", "Refund policy"] },
            { title: "Our Products", links: ["LineIcons", "Next.js Templates", "TailAdmin", "PlainAdmin"] },
            { title: "Useful Links", links: ["FAQ", "Blogs", "Support", "About"] },
          ].map((section, index) => (
            <div
              key={index}
              className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-3/12 xl:w-2/12 mb-10"
            >
              <h4 className="mb-5 text-lg font-semibold text-white">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href="#"
                      className="inline-block text-base text-gray-7 hover:text-primary"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-[#8890A4] border-opacity-40 pt-6 lg:mt-16">
          <div className="-mx-4 flex flex-wrap items-center justify-between text-center">
            <div className="w-full px-4 md:w-2/3 lg:w-1/2 mb-4 md:mb-0">
              <div className="-mx-2 flex justify-center md:justify-start">
                {["Privacy policy", "Legal notice", "Terms of service"].map((text, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="px-2 text-base text-gray-7 hover:text-white hover:underline"
                  >
                    {text}
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-full px-4 md:w-1/3 lg:w-1/2">
              <p className="text-base text-gray-7">
                Designed and Developed by{" "}
                <Link
                  href="https://tailgrids.com"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-gray-1 hover:underline"
                >
                  TailGrids and Next.js Templates
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <span className="absolute left-0 top-0 z-[-1] w-full max-w-[570px] aspect-[95/82]">
        <Image src="/images/footer/shape-1.svg" alt="shape" fill />
      </span>
      <span className="absolute bottom-0 right-0 z-[-1] w-full max-w-[372px] aspect-[31/22]">
        <Image src="/images/footer/shape-3.svg" alt="shape" fill />
      </span>
    </footer>
  );
};

export default Footer;
