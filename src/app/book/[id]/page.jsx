/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tEvBHHvUg7y
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"

export default function BookDetails({book}) {
    return (
        <main className="flex flex-col lg:flex-row gap-6 m-4">
            <div className="w-full lg:w-1/2">
                <img
                    src="/placeholder.svg"
                    alt="Product Image"
                    className="object-cover w-full rounded-lg"
                    width="500"
                    height="500"
                    style={{aspectRatio: "500/500", objectFit: "cover"}}
                />
            </div>
            <div className="w-full lg:w-1/2">
                <Card>
                    <CardContent className="p-4">
                        <h2 className="text-2xl font-bold mb-2">Product Title</h2>
                        <div className="flex items-center mb-2">
                            <StarIcon className="w-4 h-4 mr-1"/>
                            <StarIcon className="w-4 h-4 mr-1"/>
                            <StarIcon className="w-4 h-4 mr-1"/>
                            <StarIcon className="w-4 h-4 mr-1"/>
                            <StarIcon className="w-4 h-4"/>
                            <p className="text-gray-700 ml-2">(1234 ratings)</p>
                        </div>
                        <p className="text-gray-700 mb-4">
                            This is a brief description of the product. It's a great product that you should totally buy!
                        </p>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="variant">
                                Choose a variant:
                            </label>
                            <select
                                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="variant"
                            >
                                <option>Variant 1</option>
                                <option>Variant 2</option>
                                <option>Variant 3</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            <img
                                className="object-cover w-full h-16 rounded-lg"
                                src="/placeholder.svg"
                                alt="Variant 1 Preview"
                                width="64"
                                height="64"
                                style={{aspectRatio: "64/64", objectFit: "cover"}}
                            />
                            <img
                                className="object-cover w-full h-16 rounded-lg"
                                src="/placeholder.svg"
                                alt="Variant 2 Preview"
                                width="64"
                                height="64"
                                style={{aspectRatio: "64/64", objectFit: "cover"}}
                            />
                            <img
                                className="object-cover w-full h-16 rounded-lg"
                                src="/placeholder.svg"
                                alt="Variant 3 Preview"
                                width="64"
                                height="64"
                                style={{aspectRatio: "64/64", objectFit: "cover"}}
                            />
                        </div>
                        <p className="text-lg font-bold mb-4">$99.99</p>
                        <Button>Add to Cart</Button>
                    </CardContent>
                </Card>
                <Card className="mt-6">
                    <CardContent className="p-4">
                        <h2 className="text-2xl font-bold mb-2">Technical Details</h2>
                        <table className="table-auto w-full text-left">
                            <tbody>
                            <tr>
                                <td className="px-4 py-2">Material</td>
                                <td className="px-4 py-2">High-quality material</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Technology</td>
                                <td className="px-4 py-2">Advanced technology</td>
                            </tr>
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
                <Card className="mt-6">
                    <CardContent className="p-4">
                        <h2 className="text-2xl font-bold mb-2">Shipment Details</h2>
                        <p className="text-gray-700 mb-4">
                            Your product will be shipped within 3-5 business days after purchase. Please ensure your shipping details
                            are correct at checkout.
                        </p>
                        <PlaneIcon className="w-4 h-4 mb-4"/>
                        <p className="text-gray-700 mb-4">Estimated delivery: 7-10 business days</p>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

function PlaneIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
        </svg>
    )
}


function StarIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
    )
}