export default function join(...args) {
	return args.filter(Boolean).join(' ');
}
