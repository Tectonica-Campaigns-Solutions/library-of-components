import { Client, SimpleSchemaTypes } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Creating new fields/fieldsets');

  console.log('Create Single-line string field "new field" (`new_field`) in model "Basic Page" (`basic_page`)');
  await client.fields.create('AvVWOzMxQg69XxlswFVj3Q', {
    id: 'BTpl5eYjS4295XabqsZk8A',
    label: 'new field',
    field_type: 'string',
    api_key: 'new_field',
    appearance: { addons: [], editor: 'single_line', parameters: { heading: false } },
    default_value: '',
  });

  console.log('Update existing fields/fieldsets');

  console.log('Update Single-line string field "new field" (`new_field`) in model "Basic Page" (`basic_page`)');
  await client.fields.update('BTpl5eYjS4295XabqsZk8A', { position: 3 });
}
