import { TextFieldProp } from "../interfaces/IGlobal"

const CustomTextField: React.FC<TextFieldProp> = ({id, label, width, onChange}) => {
  return (
    <div className={`flex ${width} flex-col`}>
      <label htmlFor={id}>
        {label}
      </label>
      <input 
        id={id} 
        className='w-full p-3 outline-none border border-slate-300 hover:border-slate-500 focus:border-slate-500 rounded h-[50px]'
        onChange={onChange} 
      />
    </div>
  );
}

export default CustomTextField;