<script>
	import StarRating from '../lib/StarRating.svelte';
</script>

<div class="min-h-screen flex flex-col items-center justify-center p-6">

	<div class="absolute w-full h-screen -z-10 bg-[linear-gradient(to_right,#6c72e0,#9ca0f0)]">
		<ul class="relative w-full h-full overflow-hidden">
			{#each Array(10) as _, i}
				{@const size = Math.random() * 150 + 20}
					<li
						class="absolute bottom-[-150px] bg-white/40 rounded-full animate-float"
						style="
							width: {size}px;
							height: {size}px;
							left: {Math.random() * 90}%;
							animation-duration: {Math.random() * 20 + 10}s;
							animation-delay: {Math.random() * 5}s;
						"
					></li>
			{/each}
		</ul>
	</div>

	

	<h1 class="text-5xl font-extrabold text-gray-800 mb-10">
		Welcome to the Star Rating Website
	</h1>

	<div class="space-y-6 w-140 max-w-2xl">
		
		<div class="item-container">
			<img src="/item-1.png" alt="Item 1" class="image-container object-cover" />

			<div class="star-rating-container">
				<StarRating />
			</div>
		</div>

		<div class="item-container">
			<img src="/item-2.png" alt="Item 2" class="image-container object-cover" />

			<div class="star-rating-container">
				<StarRating />
			</div>
		</div>

		<div class="item-container">
			<img src="/item-3.png" alt="Item 3" class="image-container object-cover" />

			<div class="star-rating-container">
				<StarRating />
			</div>
		</div>
		
	</div>
	
</div>