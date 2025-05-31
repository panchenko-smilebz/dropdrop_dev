import Chips from '@/components/chips';
import Form from '@/components/form';
import Logo from '@/components/logo';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="lg:min-h-screen lg:grid lg:grid-cols-2 relative">
      <div className="width-full md:w-[105%] md:h-[50svh] lg:h-screen aspect-square md:aspect-auto overflow-hidden relative md:sticky top-0">
        <video
          width="100%"
          height="100%"
          poster="/background-video_poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="object-cover h-full md:bg-bottom md:bg-no-repeat md:bg-cover"
        >
          <source src="/background-video.webm" type="video/webm" />
          <source src="/background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <Link
          href="#"
          className="absolute bottom-16 lg:bottom-8 left-1/2 transform -translate-x-1/2 lg:-translate-x-[47.5%] z-1"
        >
          <Chips>
            <span>created by</span>
            <Logo />
          </Chips>
        </Link>
      </div>

      <div className="content-wrapper">
        <h1>
          Dropbox to Webflow
          <br />
          Video Embed
        </h1>
        <p className="mt-3.5 max-w-md md:max-w-[40rem] md:mt-5 text-sm md:text-lg text-neutral-700">
          Skip the cost of Vimeo Pro or third-party hosting. This tool converts
          your Dropbox video into a ready-to-use{' '}
          <span className="code-snippet inline-block bg-neutral-100 px-2 text-primary-500 rounded-md">
            &lt;video&gt;
          </span>{' '}
          tag with multiple formats, perfect for Webflow integration.
        </p>

        <div className="form-wrapper">
          <Form />
        </div>

        <ul className="attributes-description">
          <li>
            <span className="code-snippet inline-block bg-neutral-100 px-2 text-primary-500 rounded-md">
              autoplay
            </span>{' '}
            — automatically starts playing the video when the page loads.
          </li>
          <li>
            <span className="code-snippet inline-block bg-neutral-100 px-2 text-primary-500 rounded-md">
              muted
            </span>{' '}
            — mutes the video by default. Required for autoplay to work in some
            browsers.
          </li>
          <li>
            <span className="code-snippet inline-block bg-neutral-100 px-2 text-primary-500 rounded-md">
              loop
            </span>{' '}
            — restarts the video automatically when it finishes.
          </li>
          <li>
            <span className="code-snippet inline-block bg-neutral-100 px-2 text-primary-500 rounded-md">
              poster
            </span>{' '}
            — specifies an image to be shown before the video starts playing.
            Upload the image to Assets and replace {'{%your_poster%}'} with the
            correct URL.
          </li>
          <li>
            <span className="code-snippet inline-block bg-neutral-100 px-2 text-primary-500 rounded-md">
              playsinline
            </span>{' '}
            — allows the video to play inline on iOS without switching to
            fullscreen mode.
          </li>
        </ul>
      </div>
    </section>
  );
}
