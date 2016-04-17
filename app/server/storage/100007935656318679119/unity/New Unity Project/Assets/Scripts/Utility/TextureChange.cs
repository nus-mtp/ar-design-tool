using UnityEngine;
using System.Collections;

public class TextureChange : MonoBehaviour {
    public Texture myTexture;
	// Use this for initialization
	void Start () {
        Renderer rend = gameObject.GetComponent<Renderer>();
        rend.material.mainTexture = myTexture;
	}
}
