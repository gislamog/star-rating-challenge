<script>
	import StarRating from '../lib/StarRating.svelte';
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">

	<h1 class="text-5xl font-extrabold text-gray-800 mb-10 text-transparent 
		bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-blue-700 leading-[1.2] pb-2">
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