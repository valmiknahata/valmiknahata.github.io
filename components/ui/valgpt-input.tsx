import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowUp, Paperclip, Square, X, StopCircle, Mic, Globe, BrainCog, FolderCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Utility function for className merging
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

// Embedded CSS for minimal custom styles
const styles = `
  *:focus-visible {
    outline-offset: 0 !important;
    --ring-offset: 0 !important;
  }
  textarea::-webkit-scrollbar {
    width: 6px;
  }
  textarea::-webkit-scrollbar-track {
    background: transparent;
  }
  textarea::-webkit-scrollbar-thumb {
    background-color: #444444;
    border-radius: 3px;
  }
  textarea::-webkit-scrollbar-thumb:hover {
    background-color: #555555;
  }
`;

// Inject styles into document
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

// Textarea Component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
    <textarea
        className={cn(
            "flex w-full rounded-md border-none bg-transparent px-3 py-2.5 text-base placeholder:text-gray-400/60 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] resize-none scrollbar-thin scrollbar-thumb-[#444444] scrollbar-track-transparent hover:scrollbar-thumb-[#555555] font-serif",
            className
        )}
        ref={ref}
        rows={1}
        {...props}
    />
));
Textarea.displayName = "Textarea";

// Tooltip Components
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
            "z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
        )}
        {...props}
    />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Dialog Components
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[90vw] md:max-w-[800px] translate-x-[-50%] translate-y-[-50%] gap-4 border p-0 shadow-xl duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-2xl",
                className
            )}
            {...props}
        >
            {children}
            <DialogPrimitive.Close className="absolute right-4 top-4 z-10 rounded-full p-2 transition-all">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight", className)}
        {...props}
    />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost";
    size?: "default" | "sm" | "lg" | "icon";
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        const variantClasses = {
            default: "bg-white hover:bg-white/80 text-black",
            outline: "border bg-transparent",
            ghost: "bg-transparent",
        };
        const sizeClasses = {
            default: "h-10 px-4 py-2",
            sm: "h-8 px-3 text-sm",
            lg: "h-12 px-6",
            icon: "h-8 w-8 rounded-full aspect-[1/1]",
        };
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
                    variantClasses[variant],
                    sizeClasses[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

// VoiceRecorder Component
interface VoiceRecorderProps {
    isRecording: boolean;
    onStartRecording: () => void;
    onStopRecording: (duration: number) => void;
    visualizerBars?: number;
    isDarkMode?: boolean;
    transcript?: string;
}
const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
    isRecording,
    onStartRecording,
    onStopRecording,
    visualizerBars = 32,
    isDarkMode = false,
    transcript = "",
}) => {
    const [time, setTime] = React.useState(0);
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
        if (isRecording) {
            timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            // We don't call onStopRecording here because PromptInputBox handles it directly
            setTime(0);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isRecording]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center w-full transition-all duration-300 py-3",
                isRecording ? "opacity-100" : "opacity-0 h-0"
            )}
        >
            <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className={cn("font-mono text-sm", isDarkMode ? "text-white/80" : "text-gray-700/80")}>{formatTime(time)}</span>
            </div>
            <div className="w-full h-10 flex items-center justify-center gap-0.5 px-4">
                {[...Array(visualizerBars)].map((_, i) => (
                    <div
                        key={i}
                        className={cn("w-0.5 rounded-full animate-pulse", isDarkMode ? "bg-white/50" : "bg-gray-700/50")}
                        style={{
                            height: `${Math.max(15, Math.random() * 100)}%`,
                            animationDelay: `${i * 0.05}s`,
                            animationDuration: `${0.5 + Math.random() * 0.5}s`,
                        }}
                    />
                ))}
            </div>
            {transcript && (
                <div className={cn("mt-4 text-center px-6 max-h-20 overflow-y-auto text-sm italic", isDarkMode ? "text-white/60" : "text-gray-600/60")}>
                    "{transcript}..."
                </div>
            )}
        </div>
    );
};

// ImageViewDialog Component
interface ImageViewDialogProps {
    imageUrl: string | null;
    onClose: () => void;
    isDarkMode?: boolean;
}
const ImageViewDialog: React.FC<ImageViewDialogProps> = ({ imageUrl, onClose, isDarkMode = false }) => {
    if (!imageUrl) return null;
    return (
        <Dialog open={!!imageUrl} onOpenChange={onClose}>
            <DialogContent className={cn("p-0 border-none bg-transparent shadow-none max-w-[90vw] md:max-w-[800px]", isDarkMode ? "text-white" : "text-gray-900")}>
                <DialogTitle className="sr-only">Image Preview</DialogTitle>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={cn("relative rounded-2xl overflow-hidden shadow-2xl", isDarkMode ? "bg-[#1F2023]" : "bg-white")}
                >
                    <img
                        src={imageUrl}
                        alt="Full preview"
                        className="w-full max-h-[80vh] object-contain rounded-2xl"
                    />
                </motion.div>
            </DialogContent>
        </Dialog>
    );
};

// PromptInput Context and Components
interface PromptInputContextType {
    isLoading: boolean;
    value: string;
    setValue: (value: string) => void;
    maxHeight: number | string;
    onSubmit?: () => void;
    disabled?: boolean;
}
const PromptInputContext = React.createContext<PromptInputContextType>({
    isLoading: false,
    value: "",
    setValue: () => { },
    maxHeight: 240,
    onSubmit: undefined,
    disabled: false,
});
function usePromptInput() {
    const context = React.useContext(PromptInputContext);
    if (!context) throw new Error("usePromptInput must be used within a PromptInput");
    return context;
}

interface PromptInputProps {
    isLoading?: boolean;
    value?: string;
    onValueChange?: (value: string) => void;
    maxHeight?: number | string;
    onSubmit?: () => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onDragOver?: (e: React.DragEvent) => void;
    onDragLeave?: (e: React.DragEvent) => void;
    onDrop?: (e: React.DragEvent) => void;
}
const PromptInput = React.forwardRef<HTMLDivElement, PromptInputProps>(
    (
        {
            className,
            isLoading = false,
            maxHeight = 240,
            value,
            onValueChange,
            onSubmit,
            children,
            disabled = false,
            onDragOver,
            onDragLeave,
            onDrop,
        },
        ref
    ) => {
        const [internalValue, setInternalValue] = React.useState(value || "");
        const handleChange = (newValue: string) => {
            setInternalValue(newValue);
            onValueChange?.(newValue);
        };
        return (
            <TooltipProvider>
                <PromptInputContext.Provider
                    value={{
                        isLoading,
                        value: value ?? internalValue,
                        setValue: onValueChange ?? handleChange,
                        maxHeight,
                        onSubmit,
                        disabled,
                    }}
                >
                    <div
                        ref={ref}
                        className={cn(
                            "rounded-3xl border p-2 shadow-[0_8px_30px_rgba(0,0,0,0.24)] transition-all duration-300",
                            isLoading && "border-red-500/70",
                            className
                        )}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                    >
                        {children}
                    </div>
                </PromptInputContext.Provider>
            </TooltipProvider>
        );
    }
);
PromptInput.displayName = "PromptInput";

interface PromptInputTextareaProps {
    disableAutosize?: boolean;
    placeholder?: string;
}
const PromptInputTextarea: React.FC<PromptInputTextareaProps & React.ComponentProps<typeof Textarea>> = ({
    className,
    onKeyDown,
    disableAutosize = false,
    placeholder,
    ...props
}) => {
    const { value, setValue, maxHeight, onSubmit, disabled } = usePromptInput();
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        if (disableAutosize || !textareaRef.current) return;
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
            typeof maxHeight === "number"
                ? `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`
                : `min(${textareaRef.current.scrollHeight}px, ${maxHeight})`;
    }, [value, maxHeight, disableAutosize]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit?.();
        }
        onKeyDown?.(e);
    };

    return (
        <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn("text-base", className)}
            disabled={disabled}
            placeholder={placeholder}
            {...props}
        />
    );
};

interface PromptInputActionsProps extends React.HTMLAttributes<HTMLDivElement> { }
const PromptInputActions: React.FC<PromptInputActionsProps> = ({ children, className, ...props }) => (
    <div className={cn("flex items-center gap-2", className)} {...props}>
        {children}
    </div>
);

interface PromptInputActionProps extends React.ComponentProps<typeof Tooltip> {
    tooltip: React.ReactNode;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    className?: string;
}
const PromptInputAction: React.FC<PromptInputActionProps> = ({
    tooltip,
    children,
    className,
    side = "top",
    ...props
}) => {
    const { disabled } = usePromptInput();
    return (
        <Tooltip {...props}>
            <TooltipTrigger asChild disabled={disabled}>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} className={className}>
                {tooltip}
            </TooltipContent>
        </Tooltip>
    );
};

// Custom Divider Component
const CustomDivider: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => (
    <div className="relative h-6 w-[1.5px] mx-1">
        <div
            className={cn("absolute inset-0 rounded-full", isDarkMode ? "bg-gradient-to-t from-transparent via-[hsl(320,100%,70%)]/70 to-transparent" : "bg-gradient-to-t from-transparent via-[hsl(220,100%,70%)]/70 to-transparent")}
            style={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 40%, 140% 50%, 100% 60%, 100% 100%, 0% 100%, 0% 60%, -40% 50%, 0% 40%)",
            }}
        />
    </div>
);

// Main PromptInputBox Component
interface PromptInputBoxProps {
    onSend?: (message: string, files?: File[]) => void;
    isLoading?: boolean;
    placeholder?: string;
    className?: string;
    isDarkMode?: boolean;
}
export const PromptInputBox = React.forwardRef((props: PromptInputBoxProps, ref: React.Ref<HTMLDivElement>) => {
    const { onSend = () => { }, isLoading = false, placeholder = "Type your message here...", className, isDarkMode = false } = props;
    const [input, setInput] = React.useState("");
    const [showThink, setShowThink] = React.useState(false);
    const [isRecording, setIsRecording] = React.useState(false);
    const promptBoxRef = React.useRef<HTMLDivElement>(null);
    const recognitionRef = React.useRef<any>(null);

    const handleToggleChange = () => {
        setShowThink((prev) => !prev);
    };

    const handlePaste = React.useCallback((e: ClipboardEvent) => {
        // File paste logic removed
    }, []);

    React.useEffect(() => {
        document.addEventListener("paste", handlePaste);

        if (typeof window !== "undefined") {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;

                recognition.onresult = (event: any) => {
                    let fullTranscript = "";
                    for (let i = 0; i < event.results.length; i++) {
                        fullTranscript += event.results[i][0].transcript;
                    }
                    setInput(fullTranscript);
                };

                recognition.onerror = (event: any) => {
                    console.error("Speech recognition error", event.error);
                    if (event.error === 'not-allowed') {
                        alert("Microphone access denied. Please enable it in your browser settings.");
                    }
                    setIsRecording(false);
                };

                recognition.onend = () => {
                    setIsRecording(false);
                };

                recognitionRef.current = recognition;
            }
        }

        return () => {
            document.removeEventListener("paste", handlePaste);
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [handlePaste]);

    const handleSubmit = () => {
        if (input.trim()) {
            let messagePrefix = "";
            if (showThink) messagePrefix = "[Deep Thinking: ";
            const formattedInput = messagePrefix ? `${messagePrefix}${input}]` : input;
            onSend(formattedInput);
            setInput("");
        }
    };

    const handleStartRecording = () => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
            } catch (err) {
                console.error("Error starting recognition:", err);
            }
        }
    };

    const handleStopRecording = (duration: number) => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (err) {
                console.error("Error stopping recognition:", err);
            }
        }
        setIsRecording(false);
    };

    const hasContent = input.trim() !== "";

    // Color schemes based on dark mode
    // Glossy glass color schemes
    const glassBg = isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.05]";
    const glassBlur = "backdrop-blur-xl";
    const glassBorder = isDarkMode ? "border-white/[0.15]" : "border-black/[0.1]";
    const textColor = isDarkMode ? "text-gray-100" : "text-gray-900";
    const iconColor = isDarkMode ? "text-[#9CA3AF]" : "text-gray-600";
    const iconHoverColor = isDarkMode ? "hover:text-[#D1D5DB]" : "hover:text-gray-900";
    const thinkColor = isDarkMode ? "hsl(320, 100%, 70%)" : "hsl(220, 100%, 70%)";

    return (
        <>
            <PromptInput
                value={input}
                onValueChange={setInput}
                isLoading={isLoading}
                onSubmit={handleSubmit}
                className={cn(
                    "w-full shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out",
                    glassBg,
                    glassBlur,
                    glassBorder,
                    isRecording && "border-red-500/70",
                    className
                )}
                disabled={isLoading || isRecording}
                ref={ref || promptBoxRef}
            >
                <div
                    className={cn(
                        "transition-all duration-300",
                        isRecording ? "h-0 overflow-hidden opacity-0" : "opacity-100"
                    )}
                >
                    <PromptInputTextarea
                        placeholder={
                            showThink
                                ? "Ask me anything about Valmik..."
                                : placeholder
                        }
                        className={cn("text-base font-serif", textColor)}
                    />
                </div>

                {isRecording && (
                    <VoiceRecorder
                        isRecording={isRecording}
                        onStartRecording={handleStartRecording}
                        onStopRecording={handleStopRecording}
                        isDarkMode={isDarkMode}
                        transcript={input}
                    />
                )}

                <PromptInputActions className="flex items-center justify-between gap-2 p-0 pt-2">
                    <div
                        className={cn(
                            "flex items-center gap-1 transition-opacity duration-300",
                            isRecording ? "opacity-0 invisible h-0" : "opacity-100 visible"
                        )}
                    >
                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={handleToggleChange}
                                className={cn(
                                    "rounded-full transition-all flex items-center gap-1 px-2 py-1 border h-8 backdrop-blur-md",
                                    showThink
                                        ? isDarkMode
                                            ? `bg-[hsl(320,100%,70%)]/10 border-[hsl(320,100%,70%)]/30 text-[hsl(320,100%,70%)]`
                                            : `bg-[hsl(220,100%,70%)]/10 border-[hsl(220,100%,70%)]/30 text-[hsl(220,100%,70%)]`
                                        : `bg-transparent border-transparent ${iconColor} ${iconHoverColor}`
                                )}
                                style={showThink ? { color: thinkColor } : {}}
                            >
                                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                                    <motion.div
                                        animate={{ rotate: showThink ? 360 : 0, scale: showThink ? 1.1 : 1 }}
                                        whileHover={{ rotate: showThink ? 360 : 15, scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 10 } }}
                                        transition={{ type: "spring", stiffness: 260, damping: 25 }}
                                    >
                                        <BrainCog className="w-4 h-4" style={showThink ? { color: thinkColor } : {}} />
                                    </motion.div>
                                </div>
                                <AnimatePresence>
                                    {showThink && (
                                        <motion.span
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: "auto", opacity: 1 }}
                                            exit={{ width: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-xs overflow-hidden whitespace-nowrap flex-shrink-0"
                                            style={{ color: thinkColor }}
                                        >
                                            Deep Thinking
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>

                    <PromptInputAction
                        tooltip={
                            isLoading
                                ? "Stop generation"
                                : isRecording
                                    ? "Stop recording"
                                    : hasContent
                                        ? "Send message"
                                        : "Voice message"
                        }
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "h-8 w-8 rounded-full transition-all duration-200 border backdrop-blur-sm",
                                isRecording
                                    ? `text-red-500 hover:text-red-400 border-transparent bg-transparent`
                                    : hasContent
                                        ? isDarkMode
                                            ? "text-[#1F2023] border-transparent"
                                            : "text-white border-transparent"
                                        : cn(
                                            iconColor,
                                            iconHoverColor,
                                            "border-transparent bg-transparent",
                                            isDarkMode
                                                ? "active:border-[hsl(320,100%,70%)]/30 active:bg-[hsl(320,100%,70%)]/10 active:text-[hsl(320,100%,70%)]"
                                                : "active:border-[hsl(220,100%,70%)]/30 active:bg-[hsl(220,100%,70%)]/10 active:text-[hsl(220,100%,70%)]"
                                        )
                            )}
                            style={{
                                backgroundColor: !isRecording && hasContent
                                    ? (isDarkMode ? '#ffffff' : '#141414')
                                    : undefined
                            }}
                            onClick={() => {
                                if (isRecording) {
                                    handleStopRecording(0);
                                }
                                else if (hasContent) {
                                    handleSubmit();
                                }
                                else {
                                    setIsRecording(true);
                                    handleStartRecording();
                                }
                            }}
                            disabled={isLoading && !hasContent}
                        >
                            {isLoading ? (
                                <Square className={cn("h-4 w-4 animate-pulse", isDarkMode ? "fill-[#1F2023]" : "fill-white")} />
                            ) : isRecording ? (
                                <StopCircle className="h-5 w-5 text-red-500" />
                            ) : hasContent ? (
                                <ArrowUp className="h-4 w-4" />
                            ) : (
                                <Mic className="h-5 w-5 transition-colors" />
                            )}
                        </Button>
                    </PromptInputAction>
                </PromptInputActions>
            </PromptInput>
        </>
    );
});
PromptInputBox.displayName = "PromptInputBox";
