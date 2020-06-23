<script>
import {stores} from "@sapper/app";
import { stringify } from "javascript-stringify";
import {set_lang, build_lang} from '../../lang'
import Lang from '../../lang.svelte';

let { page } = stores();

let lang_str = "";

const buildLang = () => {
	lang_str = stringify(build_lang(), null, 2);
};

let title, titleText;
let description, descriptionText;

$: if(title)
{
	page.subscribe((val) =>
  {
  	titleText = document.title;
  	descriptionText = document.querySelector("meta[name=description]").getAttribute("content");
  });
}

</script>

<div class="divider"></div>
<div class="section container center-align">
	<button class="btn btn-large" on:click="{() => {buildLang();}}">Build Lang</button>
	<textarea class="materialize-textarea white-text">{lang_str}</textarea>
</div>
<div class="section container center-align">
	<h5 bind:this="{title}"><Lang key="meta.current.title">{titleText}</Lang></h5>
	<p bind:this="{description}"><Lang key="meta.current.description">{descriptionText}</Lang></p>
</div>