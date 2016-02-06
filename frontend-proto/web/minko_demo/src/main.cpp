#include "minko/Minko.hpp"
#include "minko/MinkoSDL.hpp"
#include "minko/MinkoASSIMP.hpp"

using namespace minko;
using namespace minko::math;
using namespace minko::component;

const uint WINDOW_WIDTH = 800;
const uint WINDOW_HEIGHT = 600;

const std::string DEMO_FILE = "model/pirate.obj";

int main(int argc, char** argv) 
{
    //initialise the canvas
    auto canvas = Canvas::create("Minko Demo", WINDOW_WIDTH, WINDOW_HEIGHT);
    
    auto sceneManager =     SceneManager::create(canvas);
    sceneManager
        ->assets()
        ->loader()
        ->options()
        ->registerParser<file::OBJParser>("obj")
        ->registerParser<file::ColladaParser>("dae");
        
    //add default effect to scene manager
    auto effectsLoader = file::Loader::create(sceneManager->assets()->loader())
        ->queue("effect/Basic.effect")
        ->queue("effect/Phong.effect");
        
    auto effectsComplete = effectsLoader->complete()->connect([&](file::Loader::Ptr loader)
    {
        //add model to asset list
        sceneManager
            ->assets()
            ->loader()
            ->queue(DEMO_FILE);
            
        //call the loader to load assets
        sceneManager
            ->assets()
            ->loader()
            ->load();
    });        
    
    //complete is called to set the async callback after loading is done
    auto _ = 
    sceneManager
        ->assets()
        ->loader()
        ->complete()
        ->connect([=](file::Loader:: Ptr loader) //called when finish loading
    { 
        //create scene root node
        auto root = scene::Node::create("root")->addComponent(sceneManager);
        
        //create camera node
        auto camera = scene::Node::create("camera")
            ->addComponent(Renderer::create(0x7f7f7fff))
            ->addComponent(Transform::create(
                Matrix4x4::create()->lookAt(Vector3::create(0.f, 0.f, 0.f), Vector3::create(0.f, 0.f, 5.f))
            ))
            ->addComponent(PerspectiveCamera::create(
                (float) WINDOW_WIDTH / (float) WINDOW_HEIGHT, 
                float(M_PI) * 0.25f, 
                .1f, 
                1000.f));
        root->addChild(camera);
        
        //add model to the scene
        auto objModel = sceneManager->assets()->symbol(DEMO_FILE);
        root
            ->addComponent(AmbientLight::create())
            ->addComponent(DirectionalLight::create())
            ->addChild(objModel);                
        objModel->component<Transform>()->matrix()->appendScale(0.01f);
        objModel->component<Transform>()->matrix()->translation(-1.f, -1.f, 0.f);
        
        //create signal to run when frame is resized
        auto resized = 
        canvas
            ->resized()
            ->connect([&](AbstractCanvas::Ptr canvas, uint width, uint height)
        {
            //resize single camera after frame resize
            camera->component<PerspectiveCamera>()->aspectRatio((float) width / (float) height);
        });
    });
       
    //create signal to run every single frame
    auto enterFrame =
    canvas
        ->enterFrame()
        ->connect([&](Canvas::Ptr canvas, float t, float dt) 
    {
        sceneManager->nextFrame(t, dt);
    });
    
    //start canvas
    effectsLoader->load();
    canvas->run();
    
    return 0;
}