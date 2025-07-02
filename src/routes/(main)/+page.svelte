<script lang="ts">
  import type { PageData } from './$types';
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";

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

  const fetchAnimes = async () => {
    try {
      const response = await fetch('https://api.jikan.moe/v4/seasons/now');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
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

  function getNextSnap(current: number, length: number) {
    return (current + 1) % length;
  }
</script>

<div class="pt-45 w-screen">
  {#if animes}
    <Carousel.Root setApi={(carouselApi) => (api = carouselApi)} class="w-screen max-w-screen" opts={{
      align: 'start',
      loop: true,
    }}>
      <Carousel.Content>
        {#each animes as anime, i}
          <Carousel.Item class={`${i === currentSnap ? 'basis-[28%]' : 'basis-[13.7%]'} transition-all duration-400`}>
            <Card.Root class="group relative h-[304px] overflow-hidden">
              {#if i === currentSnap && anime.trailer?.embed_url}
                <!-- svelte-ignore a11y_missing_attribute -->
<!-- svelte-ignore element_invalid_self_closing_tag -->
              <iframe
                class="absolute inset-0 w-full h-full z-0"
                src={`${anime.trailer.embed_url}?autoplay=1&muted=1&controls=0&disablekb=1&modestbranding=1&rel=0&playsinline=1&vq=hd720`}
    allow="autoplay; encrypted-media; fullscreen"
                frameborder="0"
              />
              {:else}
                <img
                  src={anime.images.jpg?.image_url}
                  alt={anime.title}
                  class="absolute inset-0 w-full h-full object-cover z-0"
                />
                {#if i === getNextSnap(currentSnap, animes.length) && anime.trailer?.embed_url}
                  <!-- svelte-ignore a11y_missing_attribute -->
                  <iframe
                    class="absolute inset-0 w-full h-full opacity-0 pointer-events-none z-[-10]"
                    src={`${anime.trailer.embed_url}?autoplay=0&mute=1&controls=0&disablekb=1&modestbranding=1&rel=0&playsinline=1&vq=hd720`}
                    frameborder="0"
                  ></iframe>
                {/if}
              {/if}
              <div class="absolute inset-0 bg-transparent group-hover:bg-black/60 transition-colors duration-500 z-10"></div>
              <Card.Header class="absolute inset-0 flex items-center justify-center z-20">
                <Card.Title class="group-hover:visible invisible text-white text-md font-bold transition-all duration-200 text-center px-2 pb-15">
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
