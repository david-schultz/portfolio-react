import Image from 'next/image'
import '@/app/styles.css'
import SiteBar from '@/components/ui/custom/SiteBar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
// import VideoPlayer from "@/components/VideoPlayer.tsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ScrollButton from '@/components/ui/custom/scroll-button'
import Footer from '@/components/ui/custom/footer'

export default function TerrariumXR() {
  return (
    <main className="flex flex-col items-center bg-repeat bg-[url('/patterns/topo-bg.png')]">
        
      {/* <BackgroundSetter after="bg-white" /> */}
      <header className="w-full flex flex-col items-center">
        <div className="mx-2 p-4 sticky top-1 w-full">
          <SiteBar />
        </div>
        <div className="mx-4 xs:mx-8 sm:mx-16 max-w-[1200px] mt-16">
          <div className="flex gap-1">
            <Badge>Case Study</Badge>
            <Badge variant="outline">Spring 2024</Badge>
          </div>
          <h1 className="mt-4 mb-4 sm:mb-8 text-3xl sm:text-4xl md:text-5xl font-500">TerrariumXR</h1>
          <div className="card"><Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/terrariumxr/outside-render.jpg"
                    alt="3d render of a user manipulating a planet with their hands"
                    height={0}
                    width={0}
                    sizes="225vw"
                    style={{ width: '100%', height: 'auto' }}
                    /></div>
        </div>
      </header>



      <article className="mx-4 xs:mx-8 sm:mx-16 max-w-[900px] mt-16 pb-32">
        <section className="grid md:grid-cols-5 gap-8 md:gap-16">
          <div className="md:col-span-3 flex flex-col gap-4 max-w-[460px]">
            <h2 className="mb-2">Exploring hand-centric geometry manipulation</h2>
            <p className="text-lg">
              For my final capstone project at the <code className="mx-1 relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-md font-600">UNIVERSITY OF WASHINGTON</code>, I designed a new approach to hand-based interactions in mixed reality.
            </p>
            {/* 
            <div className="flex gap-1">
              <Badge variant="default">Spring 2024</Badge>
              <Badge variant="outline">Unity</Badge>
              <Badge variant="outline">C#</Badge>
            </div> */}
            {/* <ul className="list-disc pl-4 flex flex-col gap-2">
              <li><strong>TerrariumXR</strong> is a mixed reality sandbox where you can create planets with your hands.</li>
              <li>Users can manipulate geometry grabbing vertices, edges, and triangles.</li>
              <li>I designed a My goal was to explore how gestural input could be used for complex tasks.</li>
            </ul> */}
            <div className="h-full"></div>
            <div className="flex flex-col gap-4">
              <Separator className="" />{/*————————————————————————————*/}
              <div className="flex gap-1">
                <Badge>Unity</Badge>
                <Badge>C#</Badge>
                <Badge variant="outline">Meta XR SDK</Badge>
              </div>
            </div>
          </div>
          <div className="card max-h-[400px] md:max-h-none md:col-span-2">
            <Image
              src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/ocean.jpg"
              alt="user wearing apple vision pro gesturing with their hand"
              height={0}
              width={0}
              sizes="225vw"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          
          <div className="card md:max-h-none md:col-span-5">
            <Image
              src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/terrariumxr/dhi-demo.jpg"
              alt="screens demonstrating the dual handed interaction approach"
              height={0}
              width={0}
              sizes="225vw"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </section>

        <section className="flex flex-col my-8 gap-4">
          {/* <h2>Demo</h2> */}
          {/* <p className="">Please note that this project is a WIP.</p> */}
          {/* <VideoPlayer width="600" height="800"
            videoUrl='https://www.youtube.com/embed/KL_WpeDrkkI?si=YDh8MgjIxrCPjL_u'
            gifUrl='https://www.youtube.com/embed/KL_WpeDrkkI?si=YDh8MgjIxrCPjL_u'
          /> */}
          <div className="mt-4 mb-64 md:mb-80 lg:mb-96 video-container">
            {/* <iframe width="1120" height="630" src="https://www.youtube.com/embed/KL_WpeDrkkI?si=YDh8MgjIxrCPjL_u" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> */}
            <div style={{padding: "100% 0 0 0", position: "relative"}}><iframe src="https://player.vimeo.com/video/953718998?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}} title="TerrariumXR (v0.6.6)"></iframe></div>
          </div>
          {/* <div className="card mt-4">
                  <Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/terrariumxr/may2-demo.gif"
                    alt="pinch + dragging vertices with hands"
                    height={0}
                    width={0}
                    sizes="225vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
              </div> */}
        </section>

        <Separator className="my-12" />{/*————————————————————————————*/}

        <section className="grid md:grid-cols-5 gap-8 md:gap-16">
          {/* <div className="card md:max-h-none md:col-span-5">
            <Image
              src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/terrariumxr/render.jpg"
              alt="3d render of a hand grabbing a vertex on a planet"
              height={0}
              width={0}
              sizes="225vw"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div> */}

          {/* <div className="md:col-span-1">
            <svg width="139" height="134" viewBox="0 0 139 134" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_281_744)">
              <path d="M95.4008 27.5823C95.4935 27.5689 95.5186 27.4468 95.4387 27.398L58.3285 4.71519C58.272 4.68067 58.1982 4.70954 58.1801 4.77322L49.8848 34.0107C49.8651 34.0804 49.9236 34.1474 49.9953 34.137L95.4008 27.5823Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M17.9506 30.2754C17.8572 30.264 17.8298 30.1418 17.9093 30.0916L57.9952 4.78592C58.0727 4.73696 58.1698 4.80954 58.1447 4.89778L49.8661 34.0767C49.8527 34.1241 49.8067 34.1546 49.7578 34.1487L17.9506 30.2754Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M23.8921 72.2964C23.9054 72.3866 24.0228 72.4133 24.0739 72.3377L49.7513 34.2943C49.7931 34.2323 49.7547 34.1481 49.6805 34.139L17.8021 30.2571C17.7366 30.2491 17.6814 30.3057 17.6911 30.371L23.8921 72.2964Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M75.6547 73.072C75.7351 73.0728 75.7835 72.9833 75.7389 72.9165L49.9257 34.283C49.8862 34.2239 49.7994 34.2237 49.7596 34.2826L24.0339 72.3975C23.9893 72.4635 24.0361 72.5526 24.1158 72.5534L75.6547 73.072Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M100.666 6.55628C100.729 6.55911 100.774 6.61868 100.759 6.67986L95.7078 27.4096C95.6917 27.4754 95.6163 27.5065 95.5585 27.4712L58.5477 4.84917C58.4595 4.79526 58.5011 4.65931 58.6043 4.66395L100.666 6.55628Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M68.6468 0.212522C68.6271 0.208627 68.6066 0.210764 68.5881 0.218656L58.6193 4.47432C58.5215 4.51608 58.5479 4.66141 58.6541 4.66619L99.4586 6.50196C99.5822 6.50752 99.6038 6.32793 99.4825 6.30396L68.6468 0.212522Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M31.9504 10.2182L58.2065 4.64851C58.2128 4.64716 58.219 4.6452 58.225 4.64265L68.6165 0.206543L31.9504 10.2182Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M17.9672 29.8273C17.9035 29.9166 18.0093 30.0285 18.102 29.9699L57.7434 4.94485C57.8378 4.88528 57.7784 4.73931 57.6693 4.76247L31.9885 10.2101C31.964 10.2153 31.9424 10.2295 31.9279 10.2499L17.9672 29.8273Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M7.93171 37.3314C7.85173 37.4217 7.9704 37.5502 8.06673 37.4776L17.6596 30.2508C17.6678 30.2446 17.6749 30.2373 17.6809 30.229L31.9505 10.2183L7.93171 37.3314Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M0.521273 69.8091C0.49611 69.9274 0.663431 69.9804 0.711018 69.8692L17.5241 30.5863C17.5644 30.4921 17.4539 30.4054 17.372 30.4671L7.30124 38.0539C7.28198 38.0684 7.26861 38.0894 7.2636 38.1129L0.521273 69.8091Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M23.9114 72.4277C23.9208 72.491 23.869 72.5467 23.8052 72.542L0.44805 70.8203C0.379597 70.8153 0.33646 70.7444 0.363467 70.6813L17.5327 30.5663C17.5724 30.4735 17.7088 30.4912 17.7236 30.591L23.9114 72.4277Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M14.5645 105.268C14.6008 105.356 14.7275 105.349 14.7532 105.257L23.8967 72.669C23.9138 72.6081 23.8708 72.5469 23.8077 72.5422L0.470114 70.822C0.39588 70.8165 0.341903 70.8912 0.370359 70.9599L14.5645 105.268Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M14.5029 105.119C14.5438 105.218 14.4218 105.304 14.343 105.231L11.5205 102.647C11.5084 102.635 11.4992 102.622 11.4938 102.606L0.30835 70.8101L14.5029 105.119Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M23.8709 72.7607C23.894 72.6784 24.003 72.6611 24.0504 72.7322L52.4726 115.338C52.5237 115.415 52.4529 115.514 52.3639 115.49L14.7732 105.562C14.7193 105.547 14.6874 105.492 14.7025 105.438L23.8709 72.7607Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M40.3767 130.759C40.419 130.8 40.488 130.796 40.525 130.75L52.5237 115.678C52.5687 115.621 52.5408 115.537 52.471 115.519L15.0401 105.632C14.9409 105.606 14.8713 105.728 14.9446 105.8L40.3767 130.759Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M75.7641 73.2199C75.8003 73.1537 75.7529 73.0727 75.6774 73.0719L24.1191 72.5532C24.0388 72.5524 23.9903 72.6418 24.0349 72.7087L52.5276 115.42C52.5693 115.483 52.6625 115.479 52.6986 115.413L75.7641 73.2199Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M75.9171 72.9058C75.8855 72.9783 75.7862 72.9871 75.7422 72.9214L49.9309 34.2907C49.89 34.2296 49.9269 34.1467 49.9997 34.1362L95.4977 27.5681C95.5752 27.5569 95.6349 27.6352 95.6037 27.707L75.9171 72.9058Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M52.7156 115.381C52.676 115.454 52.7364 115.54 52.8181 115.528L98.3436 108.747C98.4152 108.736 98.4521 108.655 98.4133 108.594L75.9348 73.2167C75.894 73.1525 75.7992 73.1556 75.7626 73.2224L52.7156 115.381Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M40.6489 130.848C40.5679 130.843 40.5258 130.749 40.5763 130.686L52.567 115.624C52.5972 115.586 52.6504 115.575 52.693 115.598L85.0157 133.192C85.1095 133.243 85.0688 133.386 84.9622 133.38L40.6489 130.848Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M98.403 108.899C98.4414 108.826 98.3811 108.741 98.2999 108.753L52.9145 115.514C52.8196 115.528 52.7971 115.655 52.8814 115.7L85.3183 133.356C85.3672 133.383 85.4284 133.364 85.4544 133.315L98.403 108.899Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M75.9362 73.2187C75.8951 73.154 75.9392 73.0689 76.0158 73.0652L122.234 70.8194C122.315 70.8155 122.366 70.9042 122.323 70.9726L98.5801 108.59C98.541 108.652 98.4505 108.652 98.4112 108.59L75.9362 73.2187Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M95.5991 27.7176C95.6313 27.6436 95.7334 27.6363 95.7758 27.705L122.337 70.6659C122.377 70.7307 122.332 70.8146 122.256 70.8183L76.0048 73.0658C75.9308 73.0694 75.8787 72.994 75.9083 72.926L95.5991 27.7176Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M100.744 6.74106C100.762 6.66386 100.859 6.63837 100.914 6.69634L126.438 33.926C126.505 33.9974 126.44 34.1126 126.344 34.0922L95.7759 27.5639C95.7208 27.5522 95.6863 27.4972 95.6997 27.4425L100.744 6.74106Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M122.274 70.5653C122.324 70.6459 122.448 70.6183 122.459 70.5241L126.646 34.2491C126.652 34.1979 126.618 34.1506 126.567 34.1399L95.9045 27.5914C95.8183 27.573 95.7522 27.6669 95.7985 27.7418L122.274 70.5653Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M138.649 66.9606C138.669 67.0171 138.636 67.0789 138.577 67.0924L122.564 70.7787C122.496 70.7942 122.434 70.7384 122.442 70.6697L126.608 34.5783C126.62 34.4736 126.765 34.4564 126.801 34.5555L138.649 66.9606Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M124.054 107.589C124.017 107.692 123.864 107.669 123.86 107.559L122.429 70.8931C122.427 70.8451 122.46 70.8026 122.507 70.7918L138.509 67.1081C138.586 67.0903 138.652 67.165 138.625 67.2395L124.054 107.589Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M98.4686 108.775C98.4855 108.743 98.5183 108.723 98.5543 108.722L123.53 108.08C123.631 108.077 123.672 108.208 123.588 108.263L85.7337 133.19C85.6473 133.247 85.5419 133.151 85.5904 133.059L98.4686 108.775Z" stroke="#202020" stroke-miterlimit="10"/>
              <path d="M122.438 71.1319C122.434 71.0338 122.306 70.9994 122.254 71.0825L98.5957 108.566C98.553 108.633 98.6029 108.721 98.6828 108.719L123.779 108.073C123.834 108.072 123.878 108.025 123.876 107.969L122.438 71.1319Z" stroke="#202020" stroke-miterlimit="10"/>
              </g>
              <defs>
              <clipPath id="clip0_281_744">
              <rect width="139" height="134" fill="white"/>
              </clipPath>
              </defs>
            </svg>
          </div>
          <div className="card p-4 md:col-span-2">
            <h4 className="mb-2">Create planets with your hands</h4>
            <p className="">
              For my final capstone project at the , I focused on hand interactions in mixed reality.
            </p>
          </div> */}

        </section>

      </article>

      <ScrollButton />

      <div className="w-[calc(100vw-2rem)] m-2">
        <Footer />
      </div>
    </main>
  )
}
