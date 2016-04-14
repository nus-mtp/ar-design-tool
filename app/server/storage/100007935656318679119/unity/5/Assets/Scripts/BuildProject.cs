#if UNITY_EDITOR
using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine.SceneManagement;
using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.IO;
using Vuforia;


public class BuildProject : MonoBehaviour {
    const string DEFAULT_SCENE_NAME = "Assets/Scenes/main.unity";
    const string VUFORIA_PACKAGE_PATH = "/Resources/Vuforia/marker.unitypackage";
    const string AR_CAMERA_PREFAB_NAME = "ARCamera";
    const string IMAGE_TARGET_PREFAB_NAME = "ImageTarget";
    const string OBJECT_TARGET_PREFAB_NAME = "ObjectTarget";
    const string APK_PATH = "/AndroidBuilds.apk";
    const string APP_PATH = "/ios.app";
    const string IMAGE_DATASET_PATH = "/Editor/QCAR/ImageTargetTextures";
    const string OBJECT_DATASET_PATH = "/Editor/QCAR/TargetSetData";
    const string MODELS_DATA_PATH = "/Resources/Obj";
    const string IDENTIFIER_FILE_PATH = "/BundleIdentifier/bundleIdentifier.txt";
    const string TEMPLATE_SCENE_NAME = "Assets/Scenes/template.unity";
    const string MARKER_TAG = "Marker";
    const string AR_CAMERA_TAG = "AR Camera";
    const int INVALID_PACKAGE_ERROR_CODE = 2;

    enum MarkerType {IMAGE, OBJECT};
    
    private static GameObject marker2d;
    private static GameObject marker3d;
    private static GameObject ARCamera;
    private static string[] levels = { DEFAULT_SCENE_NAME };

    public static void SetUpStates(GameObject marker)
    {
        ProjectState project = LoadState.Load();
        List<SerialState> states = project.serialStates;
        Scene currentScene =  EditorSceneManager.GetActiveScene();
        GameObject stateManagerGO = new GameObject();
        stateManagerGO.name = "State Manager";
        AppStateManager stateManager = stateManagerGO.AddComponent<AppStateManager>();
        stateManager.SetUp(states,marker);
        EditorSceneManager.SaveScene(currentScene, DEFAULT_SCENE_NAME, false);

    }

    [MenuItem("File/Set Identifier")]
    private static void SetIdentifier()
    {
        PlayerSettings.bundleIdentifier = File.ReadAllLines(Application.dataPath + IDENTIFIER_FILE_PATH)[0];
    }

    private static string[] ReadDataSetTrackerName(MarkerType markerType)
    {
        string[] result = new string[2];
        string datasetPath;
        if (markerType == MarkerType.IMAGE)
        {
            datasetPath = IMAGE_DATASET_PATH;
        }
        else
        {
            datasetPath = OBJECT_DATASET_PATH;
        }

        //Get DataSet name
        string[] tempArray = Directory.GetDirectories(Application.dataPath + datasetPath );
        
        if (tempArray.Length == 0)
        {
            EditorApplication.Exit(INVALID_PACKAGE_ERROR_CODE);
        }

        result[0] = Path.GetFileName(tempArray[0]);
        string temp = tempArray[0];
        

        //Get target Name
        tempArray = Directory.GetFiles(temp);
        if (tempArray.Length == 0)
        {
            EditorApplication.Exit(INVALID_PACKAGE_ERROR_CODE);
        }
        temp = Path.GetFileNameWithoutExtension(tempArray[0]);
        
      
        if (temp.Substring(temp.Length - 7, 7).Equals("_scaled"))
        {
            temp = temp.Substring(0, temp.Length-7);
        }

        result[1] = temp;

        return result;
    }

    [MenuItem("File/Copy")]
    private static void CopyScene()
    {
        Scene template = EditorSceneManager.OpenScene(TEMPLATE_SCENE_NAME);
        EditorSceneManager.SaveScene(template, DEFAULT_SCENE_NAME);
        Scene activeScene = EditorSceneManager.GetSceneByPath(DEFAULT_SCENE_NAME);
        EditorSceneManager.SetActiveScene(activeScene);
        marker2d = GameObject.FindGameObjectWithTag(MARKER_TAG);


    }

    [MenuItem("File/Setup vuforia")]
    private static void SetupVuforiaTools(MarkerType markerType)
    {
        ARCamera = GameObject.FindGameObjectWithTag(AR_CAMERA_TAG);
        string[] dataSetTrackerName = ReadDataSetTrackerName(markerType);
        Vuforia.DatabaseLoadBehaviour vuforiaTrackerPackage = ARCamera.GetComponent<Vuforia.DatabaseLoadBehaviour>();
        vuforiaTrackerPackage.SetupDataSets(dataSetTrackerName[0]);
        if(markerType == MarkerType.IMAGE){
            Vuforia.ImageTargetBehaviour imageTargetBehaviour = marker2d.GetComponent<Vuforia.ImageTargetBehaviour>();
            imageTargetBehaviour.ChangeImageTarget(dataSetTrackerName[0],dataSetTrackerName[1]);
        }
        else{
            marker3d = Instantiate(FileLoader.LoadVuforia(OBJECT_TARGET_PREFAB_NAME));
            Vuforia.ObjectTargetBehaviour objectTargetBehavior = marker3d.GetComponent<Vuforia.ObjectTargetBehaviour>();
            objectTargetBehavior.ChangeImageTarget(dataSetTrackerName[0], dataSetTrackerName[1]);
        }
 
       
    }

    [MenuItem("File/ImportPackage")]
    public static void ImportPackage()
    {
        AssetDatabase.ImportPackage(Application.dataPath + VUFORIA_PACKAGE_PATH, false);
        AssetDatabase.SaveAssets();
        AssetDatabase.Refresh(ImportAssetOptions.ForceUpdate);
    }

    [MenuItem("File/Build Android 2D")]
    public static void BuildAndroid2D()
    {
        CopyScene();
        SetupVuforiaTools(MarkerType.IMAGE);
        SetUpStates(marker2d);
        SetIdentifier();
        BuildPipeline.BuildPlayer(levels, Application.dataPath + APK_PATH, BuildTarget.Android, BuildOptions.None);
        //CleanProject();
       
        
    }

      [MenuItem("File/Build Android 3D")]
    static void BuildAndroid3D()
    {
        CopyScene();
        SetupVuforiaTools(MarkerType.OBJECT);
        SetUpStates(marker3d);
        SetIdentifier();
        BuildPipeline.BuildPlayer(levels, Application.dataPath + APK_PATH, BuildTarget.Android, BuildOptions.None);
    }

      [MenuItem("File/Build IOS 2D")]
    static void BuildIOS2D()
    {
        CopyScene();
        SetupVuforiaTools(MarkerType.IMAGE);
        SetUpStates(marker2d);
        SetIdentifier();
        BuildPipeline.BuildPlayer(levels, Application.dataPath + APP_PATH, BuildTarget.iOS, BuildOptions.None);
        
    }

     [MenuItem("File/Build IOS 3D")]
    static void BuildIOS3D()
    {
        CopyScene();
        SetupVuforiaTools(MarkerType.OBJECT);
        SetUpStates(marker3d);
        SetIdentifier();
        BuildPipeline.BuildPlayer(levels, Application.dataPath + APP_PATH, BuildTarget.iOS, BuildOptions.None);
        
    }

    [MenuItem("Assets/Uninstall Previous")]
     static void CleanProject()
     {
        bool status = AssetDatabase.DeleteAsset("Assets/Editor/QCAR");
        status = AssetDatabase.DeleteAsset("Assets/StreamingAssets");
     }
}
#endif