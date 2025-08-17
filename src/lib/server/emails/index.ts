import Welcome from './templates/welcome.svelte';
import nodemailer from 'nodemailer';
import type { Component, ComponentProps } from 'svelte';
import { render } from 'svelte/server';

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'hoshi.anime.official@gmail.com',
		pass: 'twrc cgkx nojs kugg'
	}
});

type SendEmailProps<T extends Component> = {
	from?: string;
	to: string[];
	subject: string;
	template: T;
	props: ComponentProps<T>;
};

export const sendEmail = async <T extends Component<any>>({
	from = 'HoshiAnime',
	to,
	subject,
	template,
	props
}: SendEmailProps<T>) => {
	return await transporter.sendMail({
		from: `${from} <hoshi.anime.official@gmail.com>`,
		to,
		subject,
		html: render(template as Component, {
			props
		}).body
	});
};

export const templates = {
	Welcome
};
