<script>
	let rating = null;
	let hoverRating = null;
	let locked = false;

	function setRating(newRating) {
		if (!locked) {
			rating = newRating;
			locked = true;
		}
	}

	function setHover(newRating) {
		if (!locked) {
			hoverRating = newRating;
		}
	}

	function clearHover() {
		if (!locked) {
			hoverRating = null;
		}
	}

</script>



<div class="star-rating flex items-center justify-between w-full">

	<div class="flex-1 flex justify-center gap-2 text-5xl">
		{#each Array(5) as _, i}
			<button
				type="button"
				class="px-1 transition-colors duration-200 transform"
				class:hover:scale-110={!locked}
				class:!text-yellow-400={i < (hoverRating || rating)}
				class:text-gray-400={i >= (hoverRating || rating)}
				class:cursor-pointer={!locked}
				class:cursor-default={locked}
				disabled={locked}
				aria-label="Rate {i + 1} stars"
				aria-checked={rating === i + 1}
				role="radio"
				tabindex="0"
				on:mouseover={() => setHover(i + 1)}
				on:mouseleave={clearHover}
				on:focus={() => setHover(i + 1)}
				on:blur={clearHover}
				on:click={() => setRating(i + 1)}
			>
				&#9733;
			</button>
		{/each}
	</div>

	<p class="selected-rating text-right text-gray-600 text-2xl font-bold w-24">
		{rating !== null ? `(${rating} ${rating === 1 ? 'star' : 'stars'})` : '(null)'}
	</p>


</div>
