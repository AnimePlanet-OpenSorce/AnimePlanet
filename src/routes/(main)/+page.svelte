<script lang="ts">
  import type { PageData } from './$types';
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import Autoplay from "embla-carousel-autoplay";

  let { data }: { data: PageData } = $props();

  type Anime = {
    title: string;
    description?: string;
    content?: string;
    trailer?: {
      youtube_id?: string;
      url?: string;
      embed_url?: string;
    };
    images: {
      jpg?: {
        image_url?: string;
      };
    };
  };

  let animes = $state<Anime[]>([]);
  let api = $state<CarouselAPI>();
  let currentSnap = $state(0);
  let isMuted = $state(true);

  const fetchAnimes = async () => {
    try {
      const response = await fetch('https://api.jikan.moe/v4/seasons/now');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      data.data = data.data
        .filter((anime: Anime) => anime.trailer?.youtube_id)
        .filter((anime: Anime, idx: number, arr: Anime[]) =>
          arr.findIndex(a => a.title === anime.title) === idx
        );
      animes = data.data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  $effect(() => {
    fetchAnimes();
  });

  $effect(() => {
    if (api) {
      const snap = api.selectedScrollSnap();
      api.scrollTo(snap, true);
      api.on("select", () => {
        currentSnap = api!.selectedScrollSnap();
      });
    }
  });

  // autoplay na każdy snap
  $effect(() => {
    const active = animes[currentSnap];
    if (active?.trailer?.youtube_id) {
      console.log("autoplay on snap", currentSnap, active.title);
      setTimeout(() => {
        const tryPlay = () => {
          const iframe = document.querySelector(`iframe[src*="${active.trailer?.youtube_id}"]`) as HTMLIFrameElement | null;
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(
              JSON.stringify({
                event: "command",
                func: "playVideo",
                args: [],
              }),
              "*"
            );
            iframe.contentWindow.postMessage(
              JSON.stringify({
                event: "command",
                func: isMuted ? "mute" : "unMute",
                args: [],
              }),
              "*"
            );
          } else {
            setTimeout(tryPlay, 300);
          }
        };
        tryPlay();
      }, 1000);
    }
  });

  function toggleMute() {
    isMuted = !isMuted;
    const active = animes[currentSnap];
    if (active?.trailer?.youtube_id) {
      const iframe = document.querySelector(`iframe[src*="${active.trailer.youtube_id}"]`) as HTMLIFrameElement | null;
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: isMuted ? "mute" : "unMute",
            args: [],
          }),
          "*"
        );
        if (!isMuted) {
          iframe.contentWindow.postMessage(
            JSON.stringify({
              event: "command",
              func: "setVolume",
              args: [50],
            }),
            "*"
          );
        }
      }
    }
  }
</script>

<div class="pt-45 w-screen">
  {#if animes}
    <Carousel.Root
      setApi={(carouselApi) => (api = carouselApi)}
      class="w-screen max-w-screen"
      plugins={[
        Autoplay({
          delay: 15033300,
        }),
      ]}
      opts={{
        align: 'start',
        loop: true,
        dragFree: true,
      }}
    >
      <Carousel.Content>
        {#each animes as anime, i}
          <Carousel.Item
            class={`${i === currentSnap ? 'basis-[28%]' : 'basis-[13.7%]'} transition-all duration-400`}
          >
            <Card.Root class="group relative w-full h-[289px] overflow-hidden">
              {#if i === currentSnap && anime.trailer?.embed_url}
                {#key currentSnap}
                  <iframe
                    class="absolute inset-0 w-full h-full z-0 transition-opacity duration-500 opacity-100"
                    src={`${anime.trailer.embed_url}?autoplay=1&mute=1&enablejsapi=1&controls=0&disablekb=1&modestbranding=1&rel=0&playsinline=1&vq=hd720`}
                    allow="autoplay; encrypted-media; fullscreen"
                    frameborder="0"
                    title={`Trailer for ${anime.title}`}
                  ></iframe>
                {/key}
              {/if}

              {#if i !== currentSnap && anime.images.jpg?.image_url}
                <img
                  src={anime.images.jpg?.image_url}
                  alt={anime.title}
                  class="absolute inset-0 w-full h-full object-cover z-0"
                />
              {/if}

              {#if i === currentSnap && anime.trailer?.embed_url}
                <button
                  class="absolute bottom-2 right-2 z-30 bg-black/70 text-white rounded-full p-2"
                  onclick={toggleMute}
                >
                  {#if isMuted}
                    🔇
                  {:else}
                    🔊
                  {/if}
                </button>
              {/if}

              <div class="absolute inset-0 bg-transparent group-hover:bg-black/60 transition-colors duration-500 z-10"></div>
              <Card.Header class="absolute inset-0 flex items-center justify-center z-20">
                <Card.Title
                  class="group-hover:visible invisible text-white text-md font-bold transition-all duration-200 text-center px-2 pb-15"
                >
                  {anime.title}
                </Card.Title>
              </Card.Header>
            </Card.Root>
          </Carousel.Item>
        {/each}
      </Carousel.Content>
    </Carousel.Root>
  {:else}
    <p>No animes available</p>
  {/if}
</div>
