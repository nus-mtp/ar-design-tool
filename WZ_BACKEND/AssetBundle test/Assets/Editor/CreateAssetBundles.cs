using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;

public class CreateAssetBundles
{
    private const string ASSET_BUNDLE_NAME = "webglbundles.unity3D";
    private const string ASSET_BUNDLE_OBJECTS_PATH = "/Resources/AssetBundlesObjects/";
    private const string ASSET_BUNDLE_OUTPUT_PATH = "C:/xampp/htdocs/assetbundles/";
    private const string ASSET_PATH = "Assets";
    private const string MODELS3D_PATH = "/Resources/UserModels/";
    private const string IMAGE_PATH = "/Resources/UserImages/";
    private const string PREFAB_EXTENSION = ".prefab";

    private static readonly List<string> acceptedModelFormats = new List<string> { ".obj", ".3ds", ".fbx", ".jpg", ".jpeg", ".png" };

    private static void AddMeshCollider(GameObject go)
    {
        MeshCollider[] meshColliders = go.GetComponentsInChildren<MeshCollider>();

        foreach (MeshCollider childCollider in meshColliders)
        {
            MeshCollider meshCollider = go.AddComponent<MeshCollider>();
            meshCollider.sharedMesh = childCollider.sharedMesh;
            MonoBehaviour.DestroyImmediate(childCollider);
        }
    }

    [MenuItem("Assets/Build WebGL AssetBundles")]
    private static void BuildAllAssetBundles()
    {
        string[] fileNames = Directory.GetFiles(Application.dataPath + MODELS3D_PATH);
        List<string> modelNames = new List<string>();
        List<string> imageNames = new List<string>();
        List<string> prefabPaths = new List<string>();

        ProcessFileNames(fileNames, modelNames);
        fileNames = Directory.GetFiles(Application.dataPath + IMAGE_PATH);
        ProcessFileNames(fileNames, imageNames);
        CreateModelPreFabs(modelNames, prefabPaths);
        CreateImagePrefabs(imageNames, prefabPaths);
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
        BuildPipeline.BuildAssetBundles(ASSET_BUNDLE_OUTPUT_PATH, buildInfo, BuildAssetBundleOptions.None, BuildTarget.WebGL);
    }

    private static void CreateImagePrefabs(List<string> imageNames, List<string> prefabPaths)
    {
        foreach (string imageName in imageNames)
        {
            GameObject go = GameObject.CreatePrimitive(PrimitiveType.Plane);
            Texture2D texture = FileLoader.readImage(imageName);
            go.transform.localScale = new Vector3(10, 10, (float)texture.height/texture.width * 10.0f);
            TextureChange tc = go.AddComponent<TextureChange>();
            tc.myTexture = texture;
            string outputPath = ASSET_PATH + ASSET_BUNDLE_OBJECTS_PATH + imageName + PREFAB_EXTENSION;
            PrefabUtility.CreatePrefab(outputPath, go, ReplacePrefabOptions.ReplaceNameBased);
            prefabPaths.Add(outputPath);
            //MonoBehaviour.DestroyImmediate(go);
        }
    }

    private static void CreateModelPreFabs(List<string> objNames, List<string> prefabPaths)
    {
        foreach (string objName in objNames)
        {
            GameObject go = MonoBehaviour.Instantiate(FileLoader.loadModels(objName)) as GameObject;
            AddMeshCollider(go);
            string outputPath = ASSET_PATH + ASSET_BUNDLE_OBJECTS_PATH + objName + PREFAB_EXTENSION;
            PrefabUtility.CreatePrefab(outputPath, go, ReplacePrefabOptions.ReplaceNameBased);
            prefabPaths.Add(outputPath);
            MonoBehaviour.DestroyImmediate(go);
        }
    }

    private static void ProcessFileNames(string[] fileNames, List<string> modelNames)
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

}