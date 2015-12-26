include "script"

PROJECT_NAME = path.getname(os.getcwd())

minko.project.solution(PROJECT_NAME)

	minko.project.application(PROJECT_NAME)

		files { "src/**.cpp", "src/**.hpp", "asset/**" }
		includedirs { "src" }

		-- plugin
		minko.plugin.enable("sdl")
        minko.plugin.enable("assimp")        
        minko.plugin.enable("jpeg")
        minko.plugin.enable("png")
        minko.plugin.enable("html-overlay")
                        
        configuration { "cc=clang" }
            buildoptions {
                "-Wno-extern-c-compat",
                "-Wno-objc-missing-super-calls"
            }