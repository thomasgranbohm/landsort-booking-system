<div>
	<header>
		<h1>Tack för din bokning!</h1>
	</header>

	<hr>

	<main>
		<p>
			Du har nu bokat {{ count($bunks) > 1 ? 'sängplatser' : 'sängplats' }} hos Landsorts
			Fågelstation från <time datetime="{{ $arrival }}">{{ $arrival }}</time> till <time datetime="{{ $departure }}">{{ $departure }}</time>.
		</p>

		<p><b>Du måste godkänna bokningen inom {{ config('global.confirmation_period') }} minuter för att den ska gälla!</b></p>

		<p>För att godkänna eller avbryta bokningen, <a href="{{ config('app.url') }}/hantera/?bokningsId={{ $id }}"><b>vänligen klicka här.</b></a></p>
	</main>

	<hr>

	<footer>
		<address>
			Vänliga hälsningar,<br>
			Landsorts Fågelstation<br>
			149 95 Nynäshamn<br>
			<a href="tel:+46725203401">072-520 34 01</a><br>
			<a href="mailto:landsort@granbohm.dev">landsort@granbohm.dev</a>
		</address>
	</footer>

</div>
