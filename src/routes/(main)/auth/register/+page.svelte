<script lang="ts">
	import { singUp } from '$lib/actions/auth.remote';
	import Form from '$lib/component/Form';
</script>

<div class="card-body gap-2 p-6">
	<h2 class="card-title">Witamy w HoshiAnime</h2>

	<div class="flex h-full flex-col justify-center">
		<Form form={singUp}>
			<fieldset class="fieldset gap-4">
				<Form.Field form={singUp} field="email" type="email" placeholder="Email" />
				<Form.Field form={singUp} field="name" placeholder="Login" />
				<Form.Field.Secret form={singUp} field="password" placeholder="Hasło" />
				<Form.Field.Secret form={singUp} field="confirmPassword" placeholder="Powtórz Hasło" />

				<div class="grid gap-4 sm:grid-cols-2">
					<button type="submit" class="btn text-nowrap btn-secondary">Zarejestruj się</button>
					<a href="/auth/login" class="btn text-nowrap btn-neutral">Zaloguj się</a>
				</div>
			</fieldset>
		</Form>
	</div>
</div>
