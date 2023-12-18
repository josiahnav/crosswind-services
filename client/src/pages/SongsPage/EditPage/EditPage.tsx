import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";

export default function EditPage() {


    return (
        <main className="mx-14 mt-10">
            {/*Header*/}
            <div className="flex flex-row">
                <h1 className="text-3xl">Things Of Heaven</h1>
                <button className="bg-blue-500 text-white p-3 rounded w-32">Save</button>
            </div>
            <span className="text-zinc-600">Created on December 14, 2023</span>
            {/*Song-wide details*/}
            <section className="mt-6 flex flex-row gap-8">
                <div>
                    <label htmlFor="titleInput" className="text-xs text-zinc-600">Title *</label>
                    <br/>
                    <input type="text" id="titleInput"
                           className="p-2 w-72 bg-zinc-50 border border-zinc-300 rounded focus:outline-none"/>
                </div>
                <div>
                    <label htmlFor="composerInput" className="text-xs text-zinc-600">Composer</label>
                    <br/>
                    <input type="text" id="composerInput"
                           className="p-2 w-72 bg-zinc-50 border border-zinc-300 rounded focus:outline-none"/>
                </div>
            </section>
            {/*Arrangement details*/}
            <section className="mt-12">
                <div
                    className="pl-6 py-5 bg-blue-200 border border-b-0 border-blue-300 rounded-t text-lg flex flex-row items-center">
                    <div>Arrangement</div>
                    <FontAwesomeIcon icon={faCircleInfo} className="ml-3 cursor-pointer"></FontAwesomeIcon>
                </div>
                <div className="border border-blue-300 rounded-b flex flex-row">
                    <div className="p-6 border-r border-zinc-300">
                        <ul className="text-zinc-600 text-sm">
                            <li>Arrangement 1</li>
                            <li>Arrangement 2</li>
                            <li>Arrangement 3</li>
                            <li>Arrangement 4</li>
                        </ul>
                    </div>
                    <div className="p-6 flex flex-row gap-6">
                        <div>
                            <label htmlFor="nameInput" className="text-xs text-zinc-600">Name *</label>
                            <br/>
                            <input type="text" id="nameInput"
                                   className="p-2 w-72 bg-zinc-50 border border-zinc-300 rounded focus:outline-none"/>
                            <br/>
                            <label htmlFor="descriptionInput" className="text-xs text-zinc-600">Description</label>
                            <br/>
                            <textarea id="descriptionInput" cols={30} rows={10}
                                      className="p-2 w-72 bg-zinc-50 border border-zinc-300 rounded focus:outline-none"></textarea>
                        </div>
                        <div>
                            <div className="flex flex-row gap-6">
                                <div>
                                    <label htmlFor="lengthInput" className="text-xs text-zinc-600">Length</label>
                                    <br/>
                                    <input type="text" id="lengthInput"
                                           className="p-2 w-48 bg-zinc-50 border border-zinc-300 rounded focus:outline-none"/>
                                </div>
                                <div>
                                    <label htmlFor="timeSignatureInput" className="text-xs text-zinc-600">Time
                                        Signature</label>
                                    <br/>
                                    <input type="text" id="timeSignatureInput"
                                           className="p-2 w-48 bg-zinc-50 border border-zinc-300 rounded focus:outline-none"/>
                                </div>
                                <div>
                                    <label htmlFor="bpmInput" className="text-xs text-zinc-600">BPM</label>
                                    <br/>
                                    <input type="text" id="bpmInput"
                                           className="p-2 w-48 bg-zinc-50 border border-zinc-300 rounded focus:outline-none"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
