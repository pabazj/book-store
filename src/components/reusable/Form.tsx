import React, { useState } from 'react';

type FieldConfig = {
  name: string;
  label: string;
  type?: string;
}

type FormProps = {
  fields: FieldConfig[];
  initialValues?: { [key: string]: string };
  onSubmit: (formData: { [key: string]: string }) => void;
  onCancel?: () => void;
  onFieldChange: (fieldName: string, value: string) => void;
};

const Form: React.FC<FormProps> = ({ fields, initialValues = {}, onSubmit, onCancel, onFieldChange }) => {
  const [formData, setFormData] = useState(initialValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    onFieldChange(name, value)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (

    <div className="max-w-screen-md mx-auto p-5">
      <form className="w-full">
        {fields.map((field) => (
          <div className="flex flex-wrap -mx-3 mb-6" key={field.name}>
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{field.label}</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type={field.name === 'price' ? 'number' : 'text'}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        ))}

        <div className="px-4 py-3 text-right">

          {onCancel && (
            <button type="button" className="py-2 px-4 bg-black hover:bg-black-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-0" onClick={handleSubmit}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
