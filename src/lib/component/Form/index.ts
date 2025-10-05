import Form from './From.svelte';
import Checkbox from './assets/Checkbox.svelte';
import ComboBox from './assets/ComboBox.svelte';
import Field from './assets/Field';
import File from './assets/File.svelte';
import Textarea from './assets/Textarea.svelte';

export default Object.assign(Form, { Field, Textarea, Checkbox, ComboBox, File });
