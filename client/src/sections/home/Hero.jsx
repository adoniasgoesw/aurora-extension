import Tag from "../../components/Tag";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { DownloadIcon, FileText } from "lucide-react";
import Image from "../../assets/banner.png";

export default function HomeHero() {
    const navigate = useNavigate();
    return (
        <section className="px-5 py-6 md:px-10 lg:px-20 xl:px-32">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-20">
                <div className="flex flex-col items-center justify-center gap-5">
                    <div className="flex flex-col items-center justify-center gap-5">
                        <Tag label="Fluxo criativo com IA" />
                        <h1 className="text-center text-5xl font-base">
                            Automatize seu fluxo criativo na Meta AI.
                        </h1>
                        <p className="max-w-2xl text-center text-gray-700">
                            Envie vários prompts, gere imagens automaticamente e baixe tudo
                            organizado no seu computador.
                        </p>
                    </div>

                    <div className="mt-5 flex w-full flex-col items-center justify-center gap-3 px-2 sm:w-auto sm:flex-row sm:gap-4 sm:px-0">
                        <Button
                            variant="primary"
                            icon={<DownloadIcon />}
                            label="Baixar extensão"
                            onClick={() => navigate("/download")}
                        />
                        <Button
                            variant="outline"
                            icon={<FileText />}
                            label="Ver documentação"
                            onClick={() => navigate("/documention")}
                        />
                    </div>
                </div>

                {/* Prévia da extensão com brilho neon atrás */}
                <div className="relative mt-8 w-full px-0 pb-[50px] sm:mt-12 sm:px-2 lg:mt-16">
                    <div
                        className="absolute left-1/2 top-0 -z-10 h-1/2 w-[min(92%,66rem)] -translate-x-1/2 -translate-y-2 blur-lg"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(34,211,238,0.8) 0%, rgba(139,92,246,0.6) 50%, transparent 100%)",
                        }}
                        aria-hidden
                    />
                    <div
                        className="absolute left-1/2 top-0 -z-10 h-1/2 w-[min(62%,22rem)] -translate-x-1/2 -translate-y-1 blur-md sm:w-[min(58%,24rem)] lg:w-[min(52%,26rem)]"
                        style={{
                            background: "linear-gradient(180deg, #22d3ee, #8b5cf6)",
                            opacity: 0.8,
                        }}
                        aria-hidden
                    />
                    <div className="relative mx-auto w-full max-w-3xl rounded-xl border border-neutral-200 bg-white p-2 shadow-xl shadow-neutral-200/50 dark:border-neutral-700 dark:bg-neutral-900/80 dark:shadow-black/50 sm:p-4 lg:max-w-5xl">
                        <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
                            <img
                                src={Image}
                                alt="Prévia da extensão Aurora"
                                className="h-auto w-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
