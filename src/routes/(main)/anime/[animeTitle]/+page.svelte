<script lang="ts">
	import { page } from '$app/state';
	import { episode } from '$lib/actions/episode';
	import { group } from '$lib/actions/group';
	import { seriesRelation } from '$lib/actions/seriesRelation';
	import { seriesToGroup } from '$lib/actions/seriesToGroup';
	import Banner from '$lib/component/Banner/Banner.svelte';
	import Cover from '$lib/component/Cover';
	import Episode from '$lib/component/Episode';
	import { cn } from '$lib/utils/cn';
	import { seriesSeasonEnum, seriesTypeEnum } from '$lib/utils/enums';
	import type { PageProps } from './$types';
	import Icon from '@iconify/svelte';
	import type { EventHandler } from 'svelte/elements';

	let { data }: PageProps = $props();

	const { data: relation_s } = await seriesRelation.get.many({
		filters: {
			baseSeriesId: data.series.id
		}
	});

	const episode_s = $derived(
		await episode.get.many({
			filters: {
				seriesId: data.series.id
			},
			options: {
				page: (() => {
					const _page = page.url.searchParams.get('page');
					if (!!_page) {
						return Number(_page) - 1;
					} else {
						return 0;
					}
				})()
			}
		})
	);
	// const group_s = $derived(
	// 	await group.get.many({
	// 		filters: {
	// 			id: (await seriesToGroup.get.many({
	// 				filters: {
	// 					seriesId: 'test'
	// 				}
	// 			})).data.
	// 		}
	// 	})
	// );

	const badge_s = [
		seriesTypeEnum.getByKey(data.series.type),
		`${seriesSeasonEnum.getByKey(data.series.season)} ${data.series.year.getFullYear()}`
	];

	let short_s: {
		onIcon: string;
		offIcon: string;
		fn: EventHandler<MouseEvent, HTMLInputElement>;
	}[] = [
		{
			onIcon: 'lucide:check',
			offIcon: 'lucide:share-2',
			fn: async (event) => {
				const _target = event.currentTarget;
				_target.checked = true;
				navigator.clipboard.writeText(page.url.href);
				await new Promise((resolve) => setTimeout(resolve, 500));
				_target.checked = false;
			}
		}
	];

	const getUrl = (props: { sortBy?: string; page?: string }): URL => {
		const _url = new URL(`${page.url.origin}${page.url.pathname}`);

		_url.searchParams.delete('page');

		if (!!props.page) {
			_url.searchParams.set('page', props.page);
		}

		if (!!props.sortBy) {
			_url.searchParams.set('sortBy', props.sortBy);
		}

		return _url;
	};

	let episodeSortOption_s = [
		{
			url: getUrl({ sortBy: '' }),
			text: 'Odcinkach'
		},
		{
			url: getUrl({ sortBy: 'groups' }),
			text: 'Grupach'
		}
	];

	let sortBy = $derived(page.url.searchParams.get('sortBy'));
</script>

<Banner src={data.series.bannerUrl} />

<div class="m-auto mt-40 flex w-full max-w-7xl flex-col gap-4">
	<div class="grid grid-cols-[auto_1fr] gap-4">
		<div
			class="aspect-cover w-full max-w-50 min-w-40 rounded-md bg-cover"
			style=" background-image: url({data.series.coverUrl})"
		></div>
		<div class="flex w-full flex-col justify-end gap-4">
			<h1 class="text-4xl font-bold">{data.series.title}</h1>
			<div class="flex gap-4">
				{#each badge_s as badge}
					<div class="badge badge-secondary">{badge}</div>
				{/each}
			</div>
			<div>
				<p class="line-clamp-4">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat voluptas cumque autem
					dolor laudantium dicta recusandae numquam magni vero fugiat ullam iure, facilis,
					dignissimos possimus molestiae quos iusto molestias provident velit voluptate! Cum, alias
					amet sapiente laudantium, magnam perspiciatis eveniet et modi fugit eum pariatur nemo?
					Aliquam consequatur adipisci, nemo minus soluta quidem! Eveniet, maxime veritatis
					architecto illo provident, rem voluptas modi debitis distinctio officiis qui consequuntur
					incidunt recusandae, ratione voluptatem totam corporis hic assumenda dolores. Soluta
					nihil, maxime accusamus doloribus excepturi vitae repellendus. In, deserunt maiores rerum
					cumque nam ullam corporis, quam animi maxime exercitationem nihil consequuntur suscipit
					excepturi sed aperiam ipsum perspiciatis provident iure. Dignissimos eos illum officia sed
					perferendis nihil blanditiis et dolorem, itaque possimus! Commodi doloribus ab voluptate
					et? Dicta ipsa quibusdam in ipsam qui tempora unde rem ipsum? Aliquid ratione itaque,
					voluptates asperiores molestias excepturi blanditiis, quia libero quis sit vitae earum
					sunt at. Inventore aspernatur atque eveniet illo odio. Possimus provident porro iure
					quisquam similique temporibus illo hic error itaque, accusamus cupiditate earum quo non
					eos modi beatae, quam atque voluptates maxime sint? Fuga consequuntur dolor, tempore qui
					provident, blanditiis molestiae exercitationem perferendis eos unde maxime aspernatur nisi
					minus. Voluptatem neque dolorum necessitatibus dolor porro. Minima, totam eveniet
					veritatis delectus non nam maiores, doloribus eum molestias officia rerum dicta vel harum
					odio. Tempore fuga aut explicabo adipisci animi voluptas nihil. Libero distinctio
					repellendus odio rem quas, obcaecati sapiente dolorum fugit voluptatum molestias, voluptas
					exercitationem accusamus autem modi deleniti. Autem illum quam magni in molestias maiores
					deleniti adipisci dolore. Ab id vero officiis quibusdam eum, et odit labore maxime
					dignissimos fugiat magnam, consequatur sapiente veritatis itaque dicta suscipit illo
					libero, iusto velit delectus? Veniam voluptas dicta voluptatum cum repellendus possimus
					vero aspernatur animi quod voluptates, perferendis ullam est error ratione aliquam nihil,
					impedit quae, amet nesciunt modi exercitationem atque. Accusantium aliquid quam assumenda,
					fuga consequuntur unde explicabo magni, culpa dolorum voluptas maiores a. Magni omnis
					facilis debitis ullam, distinctio cupiditate veniam non suscipit quia, nulla at labore
					odit vero nesciunt natus ex numquam, beatae dolor? Ex tenetur non fugit eligendi,
					distinctio rerum reprehenderit reiciendis ab molestiae cupiditate consequuntur minima
					doloremque nostrum architecto delectus nemo eius veniam velit? Molestias, culpa
					consequatur. Sint distinctio quo impedit sunt nihil culpa ea libero dolor! Numquam,
					dolores blanditiis? Eum eveniet esse magnam quasi aut voluptatibus, cumque quod nam nisi.
					Repellat qui culpa architecto consequatur et suscipit voluptate natus dolorem accusantium
					delectus cupiditate placeat minus earum nisi odio quis, quam consequuntur totam doloribus
					veritatis recusandae neque incidunt omnis doloremque? Illo, earum. Dolorem, enim!
					Explicabo, distinctio! Asperiores inventore ipsam fugiat officia commodi mollitia
					reiciendis repellat qui quisquam exercitationem quaerat cumque minus quidem earum eligendi
					sunt dolore quas assumenda repudiandae, officiis ex dignissimos iusto delectus cupiditate?
					Distinctio laboriosam odit dicta voluptates enim adipisci inventore eveniet perspiciatis,
					minima quibusdam repellat tempora doloribus ipsum, provident quos. Suscipit asperiores
					necessitatibus ut! Perferendis esse voluptates doloribus temporibus, culpa adipisci. Quae
					mollitia asperiores voluptatum nulla accusantium, ipsum fuga quidem sapiente nesciunt
					omnis minus placeat consectetur eaque dolorum libero cumque temporibus reprehenderit
					similique tempore illum. Voluptatem ab inventore consequuntur. Veniam neque tenetur quo ab
					quidem, ea laborum ex accusamus esse. Totam ipsa ducimus aliquid architecto excepturi odio
					voluptatem autem, laboriosam dolorem eligendi facere amet sequi maxime molestiae porro non
					debitis impedit! Corporis adipisci rem, tempora minus laborum ullam laboriosam est ipsam
					explicabo nostrum iusto officia harum labore minima veniam nulla mollitia! Libero
					recusandae sint cumque, quam provident et. Id non illo odio esse iste iusto, magni nobis
					corporis tempore distinctio magnam, hic amet eaque. Quaerat nulla, accusantium cumque
					reiciendis fuga officia nostrum! Maiores, totam itaque. Velit in officiis, recusandae
					culpa, tenetur neque commodi esse possimus dicta labore, qui consequatur tempora atque.
					Officiis unde sit maiores iure, aut illo quos laborum ut placeat. Eaque iure error
					expedita in enim, ea consectetur, quod ipsam architecto soluta sit? Aperiam consequatur
					labore quasi vel sed fuga? A laboriosam, fugiat illum excepturi ducimus, non, minus
					voluptatum sint aliquid voluptas nulla nostrum quis quidem blanditiis molestias sit odio.
					Explicabo assumenda iste itaque quo dolor, inventore odit esse eligendi modi officiis
					quasi fugiat, perferendis similique magnam laboriosam eum amet nobis unde nisi numquam
					cupiditate! Pariatur animi ea, facilis nisi exercitationem quia sint quibusdam quae
					incidunt officiis in voluptate eveniet alias nam sed repellat doloribus odit amet
					asperiores, possimus accusamus! Temporibus, id totam. Repellendus voluptates ratione error
					hic voluptate id explicabo voluptatem itaque nisi voluptas culpa incidunt perspiciatis
					modi ea, eos placeat impedit numquam, rem minus veritatis quae. Quis, quia? Totam adipisci
					ratione nisi distinctio, ab consectetur necessitatibus temporibus quos nihil eos vel! Enim
					quod quos qui ea consectetur sit, eligendi nesciunt amet. Deserunt quisquam unde iste hic
					sit quia minima voluptas harum ratione voluptatem! Exercitationem hic animi ipsum optio
					impedit commodi dignissimos sapiente unde ipsa quia, cum dolorem aliquid minima beatae.
					Numquam aperiam voluptatem alias atque fugiat! Reiciendis recusandae architecto quidem
					esse, temporibus perferendis minima ipsum consequuntur sed amet dolore explicabo eum
					ipsam, expedita quos! Dolorem facere sit sed, cupiditate accusantium reiciendis debitis
					dolores labore rerum sint odit architecto nulla numquam perferendis quaerat qui molestias
					cum ea veritatis. Illum eos nostrum provident cupiditate sunt facere quibusdam temporibus
					a aut est! Asperiores deleniti quis quibusdam maiores rerum cupiditate laboriosam eius ut
					officiis modi, enim sequi nemo ratione molestiae commodi eaque aliquid dolorum doloribus
					sit voluptate! Repudiandae quae nostrum exercitationem laudantium. Eius id enim
					accusantium! Nemo quisquam, impedit praesentium cum dolorem deleniti quas earum
					reiciendis, distinctio repellendus voluptatibus odio asperiores unde tempora, atque modi.
					Assumenda quisquam molestias possimus exercitationem error, optio iusto voluptatum nobis
					consequatur aliquam! Officia nisi in officiis vero saepe tempora tenetur! Adipisci eos
					assumenda unde, dolorum autem dolores iste esse, quos architecto consequuntur voluptatum
					et dolore consequatur ex est excepturi nisi aliquam pariatur? Earum quis, quasi itaque
					quibusdam quidem magnam non eum ea sed hic architecto aliquam rerum sit. Alias aut numquam
					iste porro. Atque eius sit, aut non consequuntur dignissimos, corporis quia fugiat
					asperiores voluptatum tempora. Inventore recusandae omnis nulla delectus? Aut repudiandae
					nemo tenetur ut vero? Suscipit vel sunt totam ipsum distinctio asperiores!
				</p>
			</div>
		</div>
		<div class="join">
			<a href="/" class="btn join-item w-full btn-secondary">
				<Icon icon="lucide:play" />
				Odtwórz
			</a>
		</div>

		<div class="flex gap-4">
			{#each short_s as short}
				<label class="btn swap btn-square swap-rotate btn-neutral">
					<input onclick={short.fn} type="checkbox" />
					<Icon class="swap-off" icon={short.offIcon} />
					<Icon class="swap-on text-success" icon={short.onIcon} />
				</label>
			{/each}
			<a
				target="_blank"
				href="https://anilist.co/anime/{data.series.malId}"
				class="btn btn-square btn-neutral"
			>
				<img src="https://anilist.co/img/icons/icon.svg" alt="" class="h-4" />
			</a>
			<a
				target="_blank"
				href="https://myanimelist.net/anime/{data.series.malId}"
				class="btn btn-square btn-neutral"
			>
				<img src="https://cdn.myanimelist.net/images/favicon.svg" alt="" class="h-4" />
			</a>
		</div>
	</div>
	<div class="mb-4 flex gap-2">
		{#each data.series.genre_s as genre}
			<div class="badge badge-neutral">
				{genre}
			</div>
		{/each}
	</div>
	{#if relation_s.length > 0}
		<h3 class="text-2xl font-bold">Powiązane</h3>
		<div class="flex">
			{#each relation_s as { referenceSeries }}
				<Cover.Relation {...referenceSeries} />
			{/each}
		</div>
	{/if}

	{sortBy}
	<div class="flex items-center gap-2">
		<h3 class="text-2xl font-bold">Sortuj po:</h3>
		<div role="tablist" class="tabs w-fit tabs-box">
			{#each episodeSortOption_s as { url, text }}
				<a
					href={url.href}
					role="tab"
					class={cn('tab', {
						'tab-active': sortBy === url.searchParams.get('sortBy')
					})}>{text}</a
				>
			{/each}
		</div>
	</div>
	<div class="grid grid-cols-2 gap-4">
		{#if page.url.searchParams.get('sortBy') === 'groups'}
			<!-- TODO: Dodać sortowanie po grupach -->
			<div>TODO: Dodać sortowanie po grupach</div>
		{:else}
			{#each episode_s.data as episode}
				<Episode {...episode} href="{page.url.pathname}/{episode.number}" />
			{/each}
		{/if}
	</div>
	<div class="flex w-full justify-end gap-2 pb-2">
		<!-- FIXME: Fix episodes pages -->
		{#each { length: episode_s.pagination.lastVisiblePage }, i}
			<a
				href={getUrl({ page: String(i + 1) }).href}
				data-sveltekit-noscroll
				class="btn btn-square btn-outline">{i + 1}</a
			>
		{/each}
	</div>
</div>
