Shader "Custom/Shadow" {
 
 
    SubShader {
   
        Tags {"Queue"="Transparent+1" "IgnoreProjector"="True" "RenderType"="Transparent"}
       
        Lighting Off
        blend One One
       
        Pass {
   
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag : Alpha
            #include "UnityCG.cginc"
 
            struct v2f {
                float4 pos      : SV_POSITION;
            };
       
            struct appdata {
                float4 vertex    : POSITION;
            };
 
       
            float4 _GrassTex_ST;
            uniform float3x3 _Object2WorldR;
           
            v2f vert (appdata v) {
           
                v2f o;
                o.pos      = mul(UNITY_MATRIX_MVP, v.vertex);
                return o;
            }
           
            fixed4 frag (v2f i) : COLOR {
                fixed4 color;
                color.rgb = fixed3(0,0,0);
                color.a = 0;
                return color;
            }
           
            ENDCG
   
        }
    }
   
    Fallback "VertexLit"
}