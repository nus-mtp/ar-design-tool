using UnityEditor;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;


public class CreateAssetBundles
{
    const string ASSET_PATH = "Assets"; 
    const string ASSET_BUNDLE_OBJECTS_PATH = "/AssetBundlesObjects/";
    const string ASSET_BUNDLE_OUTPUT_PATH = "C:/xampp/htdocs/assetbundles/";
    const string ASSET_BUNDLE_NAME = "webglbundles.unity3D";
    const string MODELS3D_PATH = "/Resources/UserModels/";
    const string PREFAB_EXTENSION = ".prefab";
   

    private static readonly List<string> acceptedModelFormats = new List<string> { ".obj", ".fbx", ".3ds" };
    
    [MenuItem("Assets/Build WebGL AssetBundles")]
    static void BuildAllAssetBundles()
    {
        string[] fileNames = Directory.GetFiles(Application.dataPath + MODELS3D_PATH);
        List<string> modelNames = new List<string>();
        List<string> prefabPaths = new List<string>();

        GetModelNames(fileNames, modelNames);
        CreatePreFabs(modelNames,prefabPaths);
        BuildBundle(prefabPaths);
   
    }

    private static void BuildBundle(List<string> prefabPaths)
    {
        AssetBundleBuild[] buildInfo = new AssetBundleBuild[1];
        buildInfo[0] = new AssetBundleBuild
        {
            assetBundleName = ASSET_BUNDLE_NAME,
            assetNames = prefabPaths.ToArray()
        };
        BuildPipeline.BuildAssetBundles(ASSET_BUNDLE_OUTPUT_PATH,buildInfo,BuildAssetBundleOptions.None, BuildTarget.WebGL);
    }

    private static void GetModelNames(string[] fileNames, List<string> modelNames)
    {
        foreach (string fileName in fileNames)
        {
            string fileExtension = Path.GetExtension(fileName).ToLower();
            if (acceptedModelFormats.Contains(fileExtension))
            {
                modelNames.Add(Path.GetFileNameWithoutExtension(fileName));
            }

        }

        foreach (string s in modelNames)
        {
            Debug.Log(s);
        }
    }

    static void CreatePreFabs(List<string> objNames, List<string> prefabPaths)
    {
        foreach (string objName in objNames)
        {
            GameObject go = Object.Instantiate(FileLoader.loadModels(objName)) as GameObject;
            string outputPath =  ASSET_PATH + ASSET_BUNDLE_OBJECTS_PATH + objName + PREFAB_EXTENSION;
            PrefabUtility.CreatePrefab(outputPath, go,ReplacePrefabOptions.ReplaceNameBased);
            prefabPaths.Add(outputPath);
            Object.DestroyImmediate(go);
        }
    }

}