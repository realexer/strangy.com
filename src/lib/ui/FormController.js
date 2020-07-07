import validate from 'validate.js'

class FormController {

	constructor(requirements) {
		this.props = {};
		this.requirements = requirements;
		this.isBusy = false;
	}

	addProp(name) {
		this.props[name] = {
			value: '',
			error: false,
			message: '',
		};
	}

	getProp(name) {
		return this.props[name];
	}

	clear() {
		for (let name in this.props) {
			this.props[name].value = '';
		}
	}

	reset() {
		for (let name in this.props) {
			this.props[name].error = false;
			this.props[name].message = '';
		}

		this.isBusy = false;
	}

	getValues() {
		const values = {};
		for (let name in this.props) {
			values[name] = this.props[name].value;
		}

		return values;
	}

	validate()
	{
		return new Promise((resolve, reject) =>
		{
			this.isBusy = true;

			this.reset();

			const validationErrors = validate(this.getValues(), this.requirements);

			console.log(validationErrors);

			if (!validationErrors)
			{
				resolve().then(() => {
					this.isBusy = false;
				});

			} else {

				for (let name in this.props) {
					if (validationErrors[name] && validationErrors[name].length > 0) {
						this.props[name].error = true;
						this.props[name].message = validationErrors[name][0];
					}
				}
			}

			this.isBusy = false;

			reject(validationErrors);
		});
	};
}

export {FormController}