<form role="form" class="affiliate-settings">
	<div class="row">
		<div class="col-sm-2 col-xs-20 settings-header">General</div>
		<div class="col-sm-10 col-xs-20">
			<p class="lead">
				Adjust these settings. You can then retrieve these settings in code via:
				<code>meta.settings.get('affiliate');</code>
			</p>
			<h3>Amazon</h3>
			<div class="form-group">
				<label for="setting-1">Amazon Tag</label>
				<input type="text" id="amazon-tag" name="amazon_tag" title="Amazon Tag" class="form-control" placeholder="phtwllt-20">
			</div>
			<div class="form-group">
				<label for="bounty-tag">Amazon Bounty Tag (Prime Perk Links)</label>
				<input type="text" id="bounty-tag" name="bounty_tag" title="Amazon Bounty Tag" class="form-control" placeholder="phtwllt-20">
			</div>
			<hr/>
			<h3>Commission Junction</h3>
			<div class="form-group">
				<label for="cj-publisher-id">Publisher ID</label>
				<input type="text" id="cj-publisher-id" name="cj_publisher_id" title="CJ Publisher ID" class="form-control" placeholder="1234567">
			</div>
			<div class="form-group">
				<label for="cj-publisher-id">Website ID</label>
				<input type="text" id="cj-website-id" name="cj_website_id" title="CJ Website ID" class="form-control" placeholder="1234567">
			</div>
		</div>
	</div>
</form>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>