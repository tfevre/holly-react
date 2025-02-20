import React from 'react'
import classnames from 'clsx'

export function NewsletterForm({ className, onSubmit, submitBtn }) {
  const [email, setEmail] = React.useState('')
  const [success, setSuccess] = React.useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const result = await onSubmit(email)
    console.log(result)
    setEmail('')
    setSuccess(true)
  }

  function handleChange(event) {
    setEmail(event.target.value)
  }

  const submit = async (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    const contractAddress = target.contractAddress.value;
    if (isAddress(contractAddress)) {
        try {
            const ct = new ethers.Contract(contractAddress, smartContract.abi, signer);
            const name = await ct.name();
            const symbol = await ct.symbol();
            const totalSupplyBn = await ct.totalSupply();
            const totalSupply = ethers.utils.formatEther(totalSupplyBn);
            setState({contractName: name, contractSymbol: symbol, contract: ct, totalSupply});
        } catch (error) {
            console.log(error);  
        };
    };
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classnames('newsletter-form is-revealing md:flex', className)}
    >
      <div className="mr-2 flex-shrink flex-grow">
        <label className="hidden" htmlFor="email" aria-hidden="true">
          Email
        </label>
        <input
          readOnly
          placeholder="0xlha1uh4ze....&hellip;"
          id="email"
          name="email"
          type="email"
          value={email}
          autoComplete="off"
          className="w-full rounded-sm border border-gray-300 bg-white px-4 py-3 m-2 text-sm text-gray-500 shadow-none"
        />
        <label className="hidden" htmlFor="email" aria-hidden="true">
          Email
        </label>
        <input
          required
          placeholder="0xlha1uh4ze....&hellip;"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          autoComplete="off"
          className="w-full rounded-sm border border-gray-300 bg-white px-4 py-3 m-2 text-sm text-gray-500 shadow-none"
        />
        <label className="hidden" htmlFor="email" aria-hidden="true">
          Email
        </label>
        <input
          required
          placeholder="0xlha1uh4ze....&hellip;"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          autoComplete="off"
          className="w-full rounded-sm border border-gray-300 bg-white px-4 py-3 m-2 text-sm text-gray-500 shadow-none"
        />
        <label className="hidden" htmlFor="email" aria-hidden="true">
          Email
        </label>
        <input
          required
          placeholder="0xlha1uh4ze....&hellip;"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          autoComplete="off"
          className="w-full rounded-sm border border-gray-300 bg-white px-4 py-3 m-2 text-sm text-gray-500 shadow-none"
        />
        {success && (
          <div className="mt-2 text-xs italic text-gray-500">
            Email submitted successfully!
          </div>
        )}
      </div>

      <div className="control">
        <button
          className="m-2 inline-flex cursor-pointer justify-center whitespace-nowrap rounded-sm border-0 bg-gradient-to-r from-secondary-500 to-secondary-400 py-4 px-7 text-center font-medium leading-4 text-white no-underline shadow-lg"
          type="submit"
        >
          {submitBtn || 'Submit'}
        </button>
        <button
          className="m-2 inline-flex cursor-pointer justify-center whitespace-nowrap rounded-sm border-0 bg-gradient-to-r from-secondary-500 to-secondary-400 py-4 px-7 text-center font-medium leading-4 text-white no-underline shadow-lg"
          type="submit"
        >
          {submitBtn || 'Submit'}
        </button>
        <button
          className="m-2 inline-flex cursor-pointer justify-center whitespace-nowrap rounded-sm border-0 bg-gradient-to-r from-secondary-500 to-secondary-400 py-4 px-7 text-center font-medium leading-4 text-white no-underline shadow-lg"
          type="submit"
        >
          {submitBtn || 'Submit'}
        </button>
        <button
          className="m-2 inline-flex cursor-pointer justify-center whitespace-nowrap rounded-sm border-0 bg-gradient-to-r from-secondary-500 to-secondary-400 py-4 px-7 text-center font-medium leading-4 text-white no-underline shadow-lg"
          type="submit"
        >
          {submitBtn || 'Submit'}
        </button>
        
      </div>
    </form>
  )
}
